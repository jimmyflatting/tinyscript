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

    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';

            if ($this->userModel->createUser($name, $email)) {
                // Redirect to a success page or user list
                header('Location: /users');
                exit;
            } else {
                $error = "Failed to create user";
            }
        }

        $this->render('user/create', ['error' => $error ?? null]);
    }

    public function read($id)
    {
        $user = $this->userModel->getUser($id);

        if ($user) {
            $this->render('user/read', ['user' => $user]);
        } else {
            $this->render('404');
        }
    }

    public function update($id)
    {
        $user = $this->userModel->getUser($id);

        if (!$user) {
            $this->render('404');
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $active = isset($_POST['active_subscription']) ? 1 : 0;
            $startDate = $_POST['subscription_date'] ?? null;
            $endDate = $_POST['subscription_end_date'] ?? null;

            if ($this->userModel->updateSubscription($id, $active, $startDate, $endDate)) {
                header('Location: /users/' . $id);
                exit;
            } else {
                $error = "Failed to update user";
            }
        }

        $this->render('user/update', ['user' => $user, 'error' => $error ?? null]);
    }

    public function delete($id)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if ($this->userModel->deleteUser($id)) {
                header('Location: /users');
                exit;
            } else {
                $error = "Failed to delete user";
            }
        }

        $user = $this->userModel->getUser($id);
        $this->render('user/delete', ['user' => $user, 'error' => $error ?? null]);
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

    public function dashboard()
    {
        $userId = $_SESSION['user_id'];
        $user = $this->userModel->getUser($userId);
        $this->render('dashboard', ['user' => $user]);
    }
}
