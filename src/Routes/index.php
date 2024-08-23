<?php

use App\Controllers\HomeController;
use App\Controllers\AppController;
use App\Router;

$router = new Router();

$router->get('/', HomeController::class, 'index');
$router->get('/app', AppController::class, 'index');

$router->dispatch();
