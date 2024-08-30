<?php

namespace App\Middleware;

class AuthMiddleware
{
    public static function isAuthenticated()
    {
        if (!isset($_SESSION['auth_token'])) {
            header('Location: /');
            exit;
        }
    }
}
