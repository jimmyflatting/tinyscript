<?php

namespace App\Controllers;

use App\Controller;
use App\Models\Item;
use App\Models\User;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class AppController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey('your_stripe_secret_key');
    }

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

        // Update the user's available tokens
        // $userModel = new User();
        // $user = $userModel->find($user_id);
        // $user['available_tokens'] -= 1;
        // $userModel->update($user_id, $user);

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

    public function subscribe()
    {
        $user_id = $_POST['user_id'] ?? null;

        if (!$user_id) {
            echo json_encode([
                'status' => false,
                'message' => 'User ID is required',
            ]);
            exit;
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price' => 'your_stripe_price_id',
                'quantity' => 1,
            ]],
            'mode' => 'subscription',
            'success_url' => 'http://yourdomain.com/subscription-success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => 'http://yourdomain.com/subscription-cancel',
        ]);

        echo json_encode([
            'status' => true,
            'session_id' => $session->id,
        ]);
        exit;
    }

    public function subscriptionSuccess()
    {
        $session_id = $_GET['session_id'] ?? null;

        if (!$session_id) {
            // Redirect to home with error toast
            header('Location: /?error=Invalid session');
            exit;
        }

        $session = Session::retrieve($session_id);
        $user_id = $session->client_reference_id;

        $userModel = new User();
        $user = $userModel->find($user_id);
        $user['active'] = 1;
        $userModel->update($user_id, $user);

        // Redirect to home with success toast
        header('Location: /?success=Subscription successful');
        exit;
    }

    public function cancelSubscription()
    {
        $user_id = $_POST['user_id'] ?? null;

        if (!$user_id) {
            echo json_encode([
                'status' => false,
                'message' => 'User ID is required',
            ]);
            exit;
        }

        $userModel = new User();
        $user = $userModel->find($user_id);

        // Cancel the subscription in Stripe
        $subscription = \Stripe\Subscription::retrieve($user['stripe_subscription_id']);
        $subscription->cancel();

        // Update user model
        $user['active'] = 0;
        $user['stripe_subscription_id'] = null;
        $userModel->update($user_id, $user);

        echo json_encode([
            'status' => true,
            'message' => 'Subscription cancelled successfully',
        ]);
        exit;
    }
}
