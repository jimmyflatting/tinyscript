<?php

use App\Controllers\HomeController;
use App\Controllers\AppController;
use App\Controllers\AuthController;
use App\Controllers\StripeController;
use App\Controllers\UserController;
use App\Middleware\AuthMiddleware;
use App\Router;

$router = new Router();

// Public routes
$router->get('/', HomeController::class, 'index');
$router->get('/login', AuthController::class, 'login');
$router->post('/login', AuthController::class, 'login');
$router->get('/signup', AuthController::class, 'signup');
$router->post('/signup', AuthController::class, 'signup');
$router->get('/logout', AuthController::class, 'logout');

// App routes (protected)
$router->get('/app', AppController::class, 'index', [AuthMiddleware::class, 'isAuthenticated']);
$router->get('/app/dashboard', UserController::class, 'dashboard', [AuthMiddleware::class, 'isAuthenticated']);
$router->get('/app/subscription/create-checkout-session', StripeController::class, 'createCheckoutSession', [AuthMiddleware::class, 'isAuthenticated']);
$router->get('/app/subscription/success', StripeController::class, 'handleSubscriptionSuccess', [AuthMiddleware::class, 'isAuthenticated']);
$router->get('/app/subscription/cancel', StripeController::class, 'handleSubscriptionCancel', [AuthMiddleware::class, 'isAuthenticated']);
$router->post('/app/create-checkout-session', StripeController::class, 'createCheckoutSession', [AuthMiddleware::class, 'isAuthenticated']);

$router->get('/app/settings', UserController::class, 'settings', [AuthMiddleware::class, 'isAuthenticated']);
$router->post('/app/update-profile', UserController::class, 'updateProfile', [AuthMiddleware::class, 'isAuthenticated']);
$router->post('/app/change-password', UserController::class, 'changePassword', [AuthMiddleware::class, 'isAuthenticated']);
$router->post('/app/cancel-subscription', UserController::class, 'cancelSubscription', [AuthMiddleware::class, 'isAuthenticated']);

$router->dispatch();
