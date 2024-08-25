<?php

use App\Controllers\HomeController;
use App\Controllers\AppController;
use App\Controllers\AuthController;
use App\Controllers\StripeController;
use App\Controllers\UserController;
use App\Middleware\AuthMiddleware;
use App\Router;

$router = new Router();

$router->get('/', HomeController::class, 'index');
$router->get('/app', AppController::class, 'index', [AuthMiddleware::class, 'isAuthenticated']);
$router->get('/login', AuthController::class, 'login');
$router->post('/login', AuthController::class, 'login');
$router->get('/signup', AuthController::class, 'signup');
$router->post('/signup', AuthController::class, 'signup');
$router->get('/logout', AuthController::class, 'logout');

$router->get('/subscription/create-checkout-session', StripeController::class, 'createCheckoutSession');
$router->get('/subscription/success', StripeController::class, 'handleSubscriptionSuccess');
$router->get('/subscription/cancel', StripeController::class, 'handleSubscriptionCancel');
$router->post('/create-checkout-session', StripeController::class, 'createCheckoutSession');

$router->get('/dashboard', UserController::class, 'dashboard', [AuthMiddleware::class, 'isAuthenticated']);

$router->dispatch();
