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

            // Deduct tokens only for trial users
            if ($user['subscription_status'] === 'trial') {
                $this->userModel->deductTokens($userId, 1);
            }

            // Send message to Replicate API and get streaming response
            $aiResponse = $this->getStreamingResponse($message);

            $messages[] = ['role' => 'assistant', 'content' => $aiResponse];

            if ($this->chatModel->createChat($userId, $messages)) {
                $updatedUser = $this->userModel->getUser($userId);
                header('Content-Type: application/json');
                echo json_encode([
                    'success' => true,
                    'response' => $aiResponse,
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
        $url = 'https://api.replicate.com/v1/predictions';

        $data = [
            'version' => 'YOUR_MODEL_VERSION',
            'input' => ['prompt' => $message],
            'stream' => true
        ];

        $options = [
            'http' => [
                'header'  => "Content-type: application/json\r\nAuthorization: Token $apiKey\r\n",
                'method'  => 'POST',
                'content' => json_encode($data)
            ]
        ];

        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        if ($result === FALSE) {
            return "Error: Unable to get response from API.";
        }

        return $this->parseStreamingResponse($result);
    }

    private function parseStreamingResponse($result)
    {
        $lines = explode("\n", $result);
        $response = '';
        foreach ($lines as $line) {
            if (strpos($line, 'data:') === 0) {
                $jsonData = json_decode(substr($line, 5), true);
                if (isset($jsonData['output'])) {
                    $response .= $jsonData['output'];
                }
            }
        }
        return $response;
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

                // Here you would typically send the message to your AI service
                // and get a response. For now, we'll just create a mock response.
                $aiResponse = "This is a mock AI response to your update.";
                $messages[] = ['role' => 'assistant', 'content' => $aiResponse];

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
