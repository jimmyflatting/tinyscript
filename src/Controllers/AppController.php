<?php

namespace App\Controllers;

use App\Controller;
use App\Models\Item;

class AppController extends Controller
{

    public function create()
    {
        $chat_body = $_POST['message'];
        $user_id = $_POST['user_id'] ?? null;
        $chat_id = isset($_POST['chat_id']) ? (int)$_POST['chat_id'] : null;

        // echo gettype($chat_id);
        // exit;

        $itemModel = new Item();

        if ($chat_id && $chat_id != 0) {
            $item = $itemModel->read($chat_id);
            if (!$item) {
                echo json_encode([
                    'status' => false,
                    'message' => 'Chat not found!',
                ]);
                exit;
            }
            // Add the new user message to the existing conversation
            $item['body'][] = ['user' => $chat_body, 'ai' => null];
        } else {
            // Create a new chat
            $item = $itemModel->create($user_id, $chat_body);
        }

        // Generate AI response
        $result = $this->chat($chat_body);

        if (!$result) {
            echo json_encode([
                'status' => false,
                'message' => 'Something went wrong!',
            ]);
            exit;
        }

        // Update the last message with AI's response
        $item['body'][count($item['body']) - 1]['ai'] = $result['data'];

        // Save the updated conversation
        $itemModel->update($item['id'], json_encode($item['body']));

        $response = [
            'status' => true,
            'message' => 'Chat completed',
            'chat_id' => $item['id'],
            'conversation' => $item['body'],
            'latest_response' => $result['data']
        ];

        echo json_encode($response);
        exit;
    }

    public function read()
    {
        /* TODO */
    }

    public function read_all()
    {
        /* TODO */
    }

    public function update($response)
    {
        // This method is no longer needed as we're handling updates in the create method
        // You can remove this method or leave it empty
    }

    public function delete()
    {
        /* TODO */
    }

    public function chat($chat_body)
    {
        $random_response = [
            'hello',
            'world',
            'this',
            'is',
            'a',
            'random',
            'response'
        ];

        return [
            'status' => true,
            'message' => 'Chat completed',
            'data' => $random_response[array_rand($random_response)]
        ];
    }
}
