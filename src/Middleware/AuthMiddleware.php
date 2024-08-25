<?php

namespace App\Middleware;

class AuthMiddleware
{
    public static function isAuthenticated()
    {
        if (!isset($_SESSION['user_id'])) {
            header('Location: /login');
            exit;
        }
    }
}
