<?php

namespace App\Controllers;

use App\Controller;
use App\Models\UserModel;

class UserController extends Controller
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
                header('Location: /dashboard');
                exit;
            } else {
                $error = "Invalid credentials";
            }
        }

        $this->render('user/login', ['error' => $error ?? null]);
    }

    public function signup()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';

            if ($this->userModel->createUser($name, $email, $password)) {
                $_SESSION['user_id'] = $this->userModel->getUserIdByEmail($email);
                header('Location: /dashboard');
                exit;
            } else {
                $error = "Failed to create user";
            }
        }

        $this->render('user/signup', ['error' => $error ?? null]);
    }

    public function settings()
    {
        $userId = $_SESSION['user_id'];
        $user = $this->userModel->getUser($userId);
        $this->render('settings', ['user' => $user]);
    }

    public function updateProfile()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $userId = $_SESSION['user_id'];
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';
            if ($this->userModel->updateUser($userId, $name, $email)) {
                $_SESSION['success_message'] = "Profile updated successfully.";
            } else {
                $_SESSION['error_message'] = "Failed to update profile.";
            }
        }
        header('Location: /app/settings');
        exit;
    }

    public function changePassword()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $userId = $_SESSION['user_id'];
            $currentPassword = $_POST['current_password'] ?? '';
            $newPassword = $_POST['new_password'] ?? '';
            $confirmPassword = $_POST['confirm_password'] ?? '';
            if ($newPassword !== $confirmPassword) {
                $_SESSION['error_message'] = "New passwords do not match.";
            } elseif ($this->userModel->changePassword($userId, $currentPassword, $newPassword)) {
                $_SESSION['success_message'] = "Password changed successfully.";
            } else {
                $_SESSION['error_message'] = "Failed to change password.";
            }
        }
        header('Location: /app/settings');
        exit;
    }

    public function cancelSubscription()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $userId = $_SESSION['user_id'];
            if ($this->userModel->cancelSubscription($userId)) {
                $_SESSION['success_message'] = "Subscription cancelled successfully.";
            } else {
                $_SESSION['error_message'] = "Failed to cancel subscription.";
            }
        }
        header('Location: /app/settings');
        exit;
    }
}
