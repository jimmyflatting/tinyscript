<?php

namespace App\Controllers;

use App\Controller;
use App\Models\User;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Subscription;

class StripeController extends Controller
{
    protected $user;

    public function __construct()
    {
        if (!isset($_ENV['STRIPE_SECRET_KEY'])) {
            throw new \Exception('Stripe secret key is not set');
        }
        \Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);
        $this->user = $this->loadUser();
    }

    public function createSubscription()
    {
        $user = $this->getCurrentUser();
        if (!$user) {
            error_log('User not authenticated');
            http_response_code(401);
            return json_encode(['error' => 'User not authenticated']);
        }

        $priceId = $_ENV['STRIPE_PRICE_ID'] ?? 'price_1PtlTWGq5NXltWykLWpwW3q9';

        try {
            if (!$user['stripe_customer_id']) {
                $customer = \Stripe\Customer::create([
                    'email' => $user['email'],
                ]);
                $user['stripe_customer_id'] = $customer->id;
                (new User())->update($user['id'], ['stripe_customer_id' => $customer->id]);
            }

            $subscription = \Stripe\Subscription::create([
                'customer' => $user['stripe_customer_id'],
                'items' => [['price' => $priceId]],
                'payment_behavior' => 'default_incomplete',
                'expand' => ['latest_invoice.payment_intent'],
            ]);

            return json_encode([
                'subscriptionId' => $subscription->id,
                'clientSecret' => $subscription->latest_invoice->payment_intent->client_secret,
            ]);
        } catch (\Stripe\Exception\AuthenticationException $e) {
            error_log('Stripe authentication error: ' . $e->getMessage());
            http_response_code(401);
            return json_encode(['error' => 'Stripe authentication failed']);
        } catch (\Exception $e) {
            error_log('Stripe error: ' . $e->getMessage());
            http_response_code(400);
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    public function cancelSubscription()
    {
        $user = $this->getCurrentUser();

        try {
            if ($user['stripe_subscription_id']) {
                $subscription = Subscription::retrieve($user['stripe_subscription_id']);
                $subscription->cancel();
                return json_encode(['success' => true]);
            } else {
                throw new \Exception('No active subscription found');
            }
        } catch (\Exception $e) {
            http_response_code(400);
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    public function getCurrentUser()
    {
        return $this->user;
    }

    protected function loadUser()
    {
        if (isset($_SESSION['user_id'])) {
            $userId = $_SESSION['user_id'];
            $userModel = new User();
            return $userModel->find($userId);
        }
        return null;
    }
}
