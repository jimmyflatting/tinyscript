<?php

namespace App\Controllers;

use App\Controller;
use App\Config;
use Google_Client;
use App\Models\User;
use Exception;

class AuthController extends Controller
{
    public function login()
    {
        $input = json_decode(file_get_contents('php://input'), true);
        $idToken = $input['id_token'] ?? null;

        if (isset($idToken)) {
            $result = $this->handleGoogleLogin($idToken);
        } else {
            $result = $this->handleEmailPasswordLogin();
        }

        header('Content-Type: application/json');
        echo json_encode($result);
        exit;
    }

    private function handleGoogleLogin(string $idToken)
    {
        $googleUser = $this->verifyGoogleToken($idToken);

        if (!$googleUser) {
            error_log("Failed to verify Google token");
            return ['status' => 'error', 'message' => 'Invalid Google token'];
        }

        $userModel = new User();
        $existingUser = $userModel->read($googleUser['email']);

        if ($existingUser) {
            $user = $existingUser;
        } else {
            $userId = $userModel->create(
                $googleUser['email'],
                $googleUser['name'],
                $googleUser['sub'] // No password for Google-authenticated users
            );
            $user = $userModel->find($userId);
        }

        if (!$user) {
            error_log("Failed to create or retrieve user");
            return ['status' => 'error', 'message' => 'Failed to create or retrieve user'];
        }

        // Set session variables
        $_SESSION['auth_token'] = $user['id'];

        error_log("Login successful for user: " . $user['email']);
        return ['status' => 'success', 'auth_token' => $_SESSION['auth_token']];
    }

    private function verifyGoogleToken(string $idToken)
    {
        $client = new Google_Client(['client_id' => $_ENV['GOOGLE_CLIENT_ID']]);
        try {
            $payload = $client->verifyIdToken($idToken);
            return $payload ? [
                'sub' => $payload['sub'],
                'email' => $payload['email'],
                'name' => $payload['name']
            ] : null;
        } catch (Exception $e) {
            return null;
        }
    }

    private function handleEmailPasswordLogin()
    {
        if (!isset($_POST['email']) || !isset($_POST['password'])) {
            return json_encode(['status' => 'error', 'message' => 'Email and password are required']);
        }

        $email = $_POST['email'];
        $password = $_POST['password'];

        $userModel = new User();
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $userId = $userModel->create($email, '', $hashed_password);
        $user = $userModel->find($userId);

        if ($user) {
            // User exists, verify password
            if (!password_verify($password, $user['password'])) {
                return json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
            }
        } else {
            // Create user if email not found
            $user_id = time(); // Simple way to generate a unique ID
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $userId = $userModel->create($email, '', $hashed_password);
            $user = $userModel->find($userId);
        }

        $authToken = $user['id'];
        $_SESSION['auth_token'] = $authToken;

        return json_encode(['status' => 'success', 'auth_token' => $authToken]);
    }

    public function logout()
    {
        session_destroy();
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Logged out successfully']);
        exit;
    }
}
