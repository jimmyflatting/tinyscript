<?php

namespace App\Controllers;

use App\Controller;
use App\Models\ChatModel;
use App\Models\UserModel;
use App\RateLimiter;

class ChatController extends Controller
{
    private $chatModel;
    private $userModel;
    private $rateLimiter;

    public function __construct()
    {
        $this->chatModel = new ChatModel();
        $this->userModel = new UserModel();
        $this->rateLimiter = new RateLimiter();
    }

    public function index()
    {
        $userId = $_SESSION['user_id'];
        $chats = $this->chatModel->getChats($userId);
        $this->render('chat/index', ['chats' => $chats]);
    }

    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $userId = $_SESSION['user_id'];

            // Check rate limit
            if (!$this->rateLimiter->check($userId)) {
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'error' => 'Rate limit exceeded. Please try again later.']);
                exit;
            }

            $user = $this->userModel->getUser($userId);

            if ($user['subscription_status'] === 'trial' && $user['tokens_available'] <= 0) {
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'error' => "You have no tokens left. Please upgrade your subscription.", 'requireUpgrade' => true]);
                exit;
            }

            $message = $_POST['message'];
            $messages = [
                ['role' => 'user', 'content' => $message]
            ];

            // Send message to Replicate API and get streaming response
            $aiResponse = $this->getStreamingResponse($message);

            // Deduct tokens based on input and output token counts
            if ($user['subscription_status'] === 'trial') {
                $inputTokens = $aiResponse['metrics']['input_token_count'] ?? 0;
                $outputTokens = $aiResponse['metrics']['output_token_count'] ?? 0;
                $totalTokens = $inputTokens + $outputTokens;
                $this->userModel->deductTokens($userId, $totalTokens);
            }

            $messages[] = ['role' => 'assistant', 'content' => $aiResponse['output']];

            if ($this->chatModel->createChat($userId, $messages)) {
                $updatedUser = $this->userModel->getUser($userId);
                header('Content-Type: application/json');
                echo json_encode([
                    'success' => true,
                    'response' => $aiResponse['output'],
                    'tokens_available' => $updatedUser['tokens_available'],
                    'subscription_status' => $updatedUser['subscription_status']
                ]);
                exit;
            } else {
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'error' => "Failed to create chat"]);
                exit;
            }
        }
        $this->render('chat/create');
    }

    private function getStreamingResponse($message)
    {
        $apiKey = $_ENV['REPLICATE_API_KEY'];
        $url = 'https://api.replicate.com/v1/models/meta/meta-llama-3-8b-instruct/predictions';

        $data = [
            'input' => [
                'top_k' => 0,
                'top_p' => 0.95,
                'prompt' => $message,
                'max_tokens' => 512,
                'temperature' => 0.7,
                'system_prompt' => $_ENV['SYSTEM_PROMPT'],
                'length_penalty' => 1,
                'stop_sequences' => "<|end_of_text|>,<|eot_id|>",
                'prompt_template' => "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
                'presence_penalty' => 0,
                'log_performance_metrics' => false
            ]
        ];

        $options = [
            'http' => [
                'header'  => "Content-type: application/json\r\nAuthorization: Bearer $apiKey\r\n",
                'method'  => 'POST',
                'content' => json_encode($data)
            ]
        ];

        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        if ($result === FALSE) {
            return ["output" => "Error: Unable to get response from API.", "metrics" => ["input_token_count" => 0, "output_token_count" => 0]];
        }

        return $this->parseStreamingResponse($result);
    }

    private function parseStreamingResponse($result)
    {
        $jsonResult = json_decode($result, true);

        if (isset($jsonResult['error'])) {
            return ["output" => "Error: " . $jsonResult['error'], "metrics" => ["input_token_count" => 0, "output_token_count" => 0]];
        }

        // For now, we'll return the entire output as a single string
        // In a real streaming scenario, you'd process this differently
        return [
            "output" => $jsonResult['output'] ?? "No output received",
            "metrics" => [
                "input_token_count" => $jsonResult['metrics']['input_token_count'] ?? 0,
                "output_token_count" => $jsonResult['metrics']['output_token_count'] ?? 0
            ]
        ];
    }

    public function view($chatId)
    {
        $userId = $_SESSION['user_id'];
        $chat = $this->chatModel->getChat($chatId);
        if ($chat && $chat['user_id'] == $userId) {
            $this->render('chat/view', ['chat' => $chat]);
        } else {
            header('Location: /chat');
            exit;
        }
    }

    public function update($chatId)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $userId = $_SESSION['user_id'];
            $chat = $this->chatModel->getChat($chatId);
            if ($chat && $chat['user_id'] == $userId) {
                $messages = json_decode($chat['messages'], true);
                $messages[] = ['role' => 'user', 'content' => $_POST['message']];

                $aiResponse = $this->getStreamingResponse($_POST['message']);
                $messages[] = ['role' => 'assistant', 'content' => $aiResponse['output']];

                if ($this->chatModel->updateChat($chatId, $messages)) {
                    header('Location: /chat/view/' . $chatId);
                    exit;
                } else {
                    $error = "Failed to update chat";
                }
            }
        }
        $this->render('chat/view', ['chat' => $chat, 'error' => $error ?? null]);
    }

    public function delete($chatId)
    {
        $userId = $_SESSION['user_id'];
        $chat = $this->chatModel->getChat($chatId);
        if ($chat && $chat['user_id'] == $userId) {
            if ($this->chatModel->deleteChat($chatId)) {
                header('Location: /chat');
                exit;
            } else {
                $error = "Failed to delete chat";
            }
        }
        $this->render('chat/index', ['error' => $error ?? null]);
    }
}
