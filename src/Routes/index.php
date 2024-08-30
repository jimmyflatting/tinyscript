<?php

use App\Controllers\AppController;
use App\Controllers\AuthController;
use App\Controllers\RouteController;
use App\Controllers\UserController;
use App\Middleware\AuthMiddleware;
use App\Router;

$router = new Router();

// Public routes
if (!isset($_SESSION['auth_token'])) {
    $router->get('/', RouteController::class, 'index');
} else {
    $router->get('/', RouteController::class, 'app');
}

// Auth routes
$router->post('/api/login', AuthController::class, 'login');
$router->post('/api/logout', AuthController::class, 'logout', [AuthMiddleware::class, 'isAuthenticated']);

// User routes
$router->get('/api/user', UserController::class, 'read', [AuthMiddleware::class, 'isAuthenticated']);
$router->put('/api/user', UserController::class, 'update', [AuthMiddleware::class, 'isAuthenticated']);
$router->delete('/api/user', UserController::class, 'delete', [AuthMiddleware::class, 'isAuthenticated']);

// App routes (protected)
$router->post('/api/item', AppController::class, 'create', [AuthMiddleware::class, 'isAuthenticated']);
$router->get('/api/item', AppController::class, 'read', [AuthMiddleware::class, 'isAuthenticated']);
$router->delete('/api/item', AppController::class, 'delete', [AuthMiddleware::class, 'isAuthenticated']);

// dispatch
$router->dispatch();
