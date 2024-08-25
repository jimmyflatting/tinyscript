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
        $this->alterTable();
    }

    private function createTable()
    {
        $query = "CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        active_subscription BOOLEAN DEFAULT 0,
        subscription_date TEXT,
        subscription_end_date TEXT
    )";

        try {
            $this->db->exec($query);
        } catch (PDOException $e) {
            die("Table creation failed: " . $e->getMessage());
        }
    }

    private function alterTable()
    {
        $query = "ALTER TABLE users ADD COLUMN password TEXT";

        try {
            $this->db->exec($query);
        } catch (PDOException $e) {
            // If the column already exists, it will throw an error, which we can ignore
            if (strpos($e->getMessage(), 'duplicate column name') === false) {
                die("Table alteration failed: " . $e->getMessage());
            }
        }
    }

    public function createUser($name, $email, $password)
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        return $stmt->execute();
    }

    public function updateSubscription($userId, $active, $startDate, $endDate, $subscriptionId)
    {
        $query = "UPDATE users SET active_subscription = :active, 
              subscription_date = :start_date, 
              subscription_end_date = :end_date,
              stripe_subscription_id = :subscription_id 
              WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':active', $active, PDO::PARAM_BOOL);
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
}
