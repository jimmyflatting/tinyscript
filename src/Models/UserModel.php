<?php

namespace App\Models;

use App\Database;
use PDO;
use PDOException;

class UserModel
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
        $this->createTable();
    }

    private function createTable()
    {
        $query = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        subscription_status ENUM('active', 'inactive', 'trial') DEFAULT 'inactive',
        tokens_available INT DEFAULT 0,
        subscription_start_date DATE,
        subscription_end_date DATE,
        stripe_subscription_id VARCHAR(255)
    )";

        try {
            $this->db->exec($query);
        } catch (PDOException $e) {
            die("Table creation failed: " . $e->getMessage());
        }
    }

    public function createUser($name, $email, $password)
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO users (name, email, password, subscription_status, tokens_available) VALUES (:name, :email, :password, 'trial', 1000)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        return $stmt->execute();
    }

    public function updateSubscription($userId, $status, $tokens, $startDate, $endDate, $subscriptionId)
    {
        $query = "UPDATE users SET 
              subscription_status = :status, 
              tokens_available = :tokens,
              subscription_start_date = :start_date, 
              subscription_end_date = :end_date,
              stripe_subscription_id = :subscription_id 
              WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':tokens', $tokens, PDO::PARAM_INT);
        $stmt->bindParam(':start_date', $startDate);
        $stmt->bindParam(':end_date', $endDate);
        $stmt->bindParam(':subscription_id', $subscriptionId);
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function getUser($userId)
    {
        $query = "SELECT * FROM users WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function deleteUser($id)
    {
        // Implement user deletion logic here
        // For example:
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }

    public function authenticate($email, $password)
    {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            return true;
        }
        return false;
    }

    public function getUserIdByEmail($email)
    {
        $sql = "SELECT id FROM users WHERE email = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$email]);
        return $stmt->fetchColumn();
    }

    public function updateUser($userId, $name, $email)
    {
        $query = "UPDATE users SET name = :name, email = :email WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        return $stmt->execute();
    }
    public function changePassword($userId, $currentPassword, $newPassword)
    {
        $user = $this->getUser($userId);
        if (password_verify($currentPassword, $user['password'])) {
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $query = "UPDATE users SET password = :password WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':password', $hashedPassword);
            $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
            return $stmt->execute();
        }
        return false;
    }
    public function cancelSubscription($userId)
    {
        $query = "UPDATE users SET active_subscription = 0, subscription_end_date = NULL WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function find($userId)
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function deductTokens($userId, $amount)
    {
        $query = "UPDATE users SET tokens_available = tokens_available - :amount WHERE id = :id AND tokens_available >= :amount";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function addTokens($userId, $amount)
    {
        $query = "UPDATE users SET tokens_available = tokens_available + :amount WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
