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
            header('Location: /register');
            exit;
        }

        $priceId = $_POST['price_id'] ?? null;
        if (!$priceId) {
            // Handle error
            $this->render('stripe-error', ['message' => 'Invalid price ID']);
            return;
        }

        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price' => $priceId,
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => $_ENV['HOME_URL'] . '/app?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $_ENV['HOME_URL'] . '/app',
                'client_reference_id' => $userId,
            ]);

            header('Location: ' . $session->url);
            exit;
        } catch (\Exception $e) {
            $this->render('stripe-error', ['message' => $e->getMessage()]);
        }
    }

    public function handleSubscriptionSuccess()
    {
        $sessionId = $_GET['session_id'] ?? null;
        if (!$sessionId) {
            $this->render('stripe-error', ['message' => 'Invalid session ID']);
            return;
        }

        $session = Session::retrieve($sessionId);
        $userId = $session->client_reference_id;
        $subscriptionId = $session->subscription;

        // Get subscription details
        $subscription = \Stripe\Subscription::retrieve($subscriptionId);
        $startDate = date('Y-m-d', $subscription->current_period_start);
        $endDate = date('Y-m-d', $subscription->current_period_end);

        // Upgrade user to active subscription
        if ($this->userModel->upgradeToActiveSubscription($userId, $subscriptionId, $startDate, $endDate)) {
            $this->render('subscription-success');
        } else {
            $this->render('stripe-error', ['message' => 'Failed to update subscription']);
        }
    }


    public function createTokenPurchaseSession()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('Location: /');
            exit;
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            header('Location: /login');
            exit;
        }

        $tokenAmount = $_POST['token_amount'] ?? null;
        if (!$tokenAmount || !is_numeric($tokenAmount)) {
            $this->render('stripe-error', ['message' => 'Invalid token amount']);
            return;
        }

        $unitPrice = 0.01; // $0.01 per token
        $totalPrice = $tokenAmount * $unitPrice * 100; // Convert to cents for Stripe

        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => 'TinyScript Tokens',
                        ],
                        'unit_amount' => $totalPrice,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => $_ENV['HOME_URL'] . '/app/token-purchase-success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $_ENV['HOME_URL'] . '/app',
                'client_reference_id' => $userId,
                'metadata' => [
                    'token_amount' => $tokenAmount,
                ],
            ]);

            header('Location: ' . $session->url);
            exit;
        } catch (\Exception $e) {
            $this->render('stripe-error', ['message' => $e->getMessage()]);
        }
    }

    public function handleTokenPurchaseSuccess()
    {
        $sessionId = $_GET['session_id'] ?? null;
        if (!$sessionId) {
            $this->render('stripe-error', ['message' => 'Invalid session ID']);
            return;
        }

        $session = Session::retrieve($sessionId);
        $userId = $session->client_reference_id;
        $tokenAmount = $session->metadata['token_amount'];

        // Update user's token balance in the database
        $this->userModel->addTokens($userId, $tokenAmount);

        $this->render('token-purchase-success', ['tokenAmount' => $tokenAmount]);
    }

    public function handleSubscriptionCancel()
    {
        /* TODO */

        $this->render('app');
    }
}
