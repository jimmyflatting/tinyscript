<?php

namespace App\Controllers;

use App\Controller;
use App\Models\UserModel;

class AuthController extends Controller
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';

            if ($this->userModel->authenticate($email, $password)) {
                $_SESSION['user_id'] = $this->userModel->getUserIdByEmail($email);
                header('Location: /app');
                exit;
            } else {
                $error = "Invalid credentials";
            }
        }

        $this->render('login', ['error' => $error ?? null]);
    }

    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';

            if ($this->userModel->createUser($name, $email, $password)) {
                $_SESSION['user_id'] = $this->userModel->getUserIdByEmail($email);
                header('Location: /app');
                exit;
            } else {
                $error = "Failed to create user";
            }
        }

        $this->render('register', ['error' => $error ?? null]);
    }

    public function logout()
    {
        session_destroy();
        header('Location: /');
        exit;
    }
}
