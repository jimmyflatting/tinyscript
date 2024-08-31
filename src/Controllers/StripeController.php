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
        Stripe::setApiKey('your_stripe_secret_key');
        $this->user = $this->loadUser(); // Implement this method to load the user
    }

    public function createSubscription()
    {
        $user = $this->getCurrentUser(); // Implement this method to get the logged-in user
        $priceId = $_POST['price_id']; // Get the selected price ID from the form

        try {
            if (!$user['stripe_customer_id']) {
                $customer = Customer::create([
                    'email' => $user['email'],
                ]);
                $user['stripe_customer_id'] = $customer->id;
                (new User())->update($user['id'], ['stripe_customer_id' => $customer->id]);
            }

            $subscription = Subscription::create([
                'customer' => $user['stripe_customer_id'],
                'items' => [['price' => $priceId]],
                'payment_behavior' => 'default_incomplete',
                'expand' => ['latest_invoice.payment_intent'],
            ]);

            return json_encode([
                'subscriptionId' => $subscription->id,
                'clientSecret' => $subscription->latest_invoice->payment_intent->client_secret,
            ]);
        } catch (\Exception $e) {
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
            $userModel = new \App\Models\User();
            $this->user = $userModel->find($userId);
        } else {
            $this->user = null;
        }
    }
}
