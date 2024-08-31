<?php

namespace App\Controllers;

use App\Controller;
use App\Models\User;
use Stripe\Webhook;

class StripeWebhookController extends Controller
{
    public function handleWebhook()
    {
        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = Webhook::constructEvent(
                $payload,
                $sig_header,
                'your_stripe_webhook_secret'
            );
        } catch (\UnexpectedValueException $e) {
            http_response_code(400);
            exit();
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            http_response_code(400);
            exit();
        }

        switch ($event->type) {
            case 'customer.subscription.deleted':
                $this->handleCancelledSubscription($event->data->object);
                break;
            case 'customer.subscription.created':
                $this->handleNewSubscription($event->data->object);
                break;
            case 'customer.subscription.updated':
                $this->handleUpdatedSubscription($event->data->object);
                break;
                // Add more event handlers as needed
        }

        http_response_code(200);
    }

    private function handleCancelledSubscription($subscription)
    {
        $userModel = new User();
        $user = $userModel->findByStripeCustomerId($subscription->customer);

        if ($user) {
            $user['active'] = 0;
            $user['stripe_subscription_id'] = null;
            $userModel->update($user['id'], $user);
            $this->showToast('Subscription cancelled successfully');
        }
    }

    private function handleNewSubscription($subscription)
    {
        $userModel = new User();
        $user = $userModel->findByStripeCustomerId($subscription->customer);

        if ($user) {
            $user['active'] = 1;
            $user['stripe_subscription_id'] = $subscription->id;
            $userModel->update($user['id'], $user);
            $this->showToast('Subscription created successfully');
        }
    }

    private function handleUpdatedSubscription($subscription)
    {
        $userModel = new User();
        $user = $userModel->findByStripeCustomerId($subscription->customer);

        if ($user) {
            $user['active'] = $subscription->status === 'active' ? 1 : 0;
            $user['stripe_subscription_id'] = $subscription->id;
            $userModel->update($user['id'], $user);
            $this->showToast('Subscription updated successfully');
        }
    }

    private function showToast($message)
    {
        // Implement your toast notification logic here
        // This could be setting a session variable or using a front-end library
    }
}
