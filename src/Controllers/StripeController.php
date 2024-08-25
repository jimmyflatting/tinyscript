<?php

namespace App\Controllers;

use App\Controller;
use App\Models\UserModel;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeController extends Controller
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
        Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);
    }

    public function createCheckoutSession()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('Location: /');
            exit;
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            header('Location: /signup');
            exit;
        }

        $priceId = $_POST['price_id'] ?? null;
        if (!$priceId) {
            // Handle error
            $this->render('subscription/error', ['message' => 'Invalid price ID']);
            return;
        }

        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price' => 'price_1PrjsIGq5NXltWykKCOFMazx',
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => $_ENV['HOME_URL'] . '/app?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $_ENV['HOME_URL'],
                'client_reference_id' => $userId,
            ]);

            header('Location: ' . $session->url);
            exit;
        } catch (\Exception $e) {
            $this->render('subscription/error', ['message' => $e->getMessage()]);
        }
    }

    public function handleSubscriptionSuccess()
    {
        $sessionId = $_GET['session_id'] ?? null;
        if (!$sessionId) {
            // Handle error
            $this->render('subscription/error', ['message' => 'Invalid session ID']);
            return;
        }

        $session = Session::retrieve($sessionId);
        $userId = $session->client_reference_id;
        $subscriptionId = $session->subscription;

        // Update user's subscription status in the database
        $this->userModel->updateSubscription($userId, true, date('Y-m-d'), null, $subscriptionId);

        $this->render('app');
    }

    public function handleSubscriptionCancel()
    {
        $this->render('index');
    }
}
