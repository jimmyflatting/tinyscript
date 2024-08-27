<?php

namespace App\Models;

use App\Database;
use PDO;
use PDOException;

class ChatModel
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
        $this->createTable();
    }

    private function createTable()
    {
        $query = "CREATE TABLE IF NOT EXISTS chats (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            messages JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )";
        try {
            $this->db->exec($query);
        } catch (PDOException $e) {
            die("Table creation failed: " . $e->getMessage());
        }
    }

    public function createChat($userId, $messages)
    {
        $query = "INSERT INTO chats (user_id, messages) VALUES (:user_id, :messages)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':messages', json_encode($messages));
        return $stmt->execute();
    }

    public function getChats($userId)
    {
        $query = "SELECT * FROM chats WHERE user_id = :user_id ORDER BY created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function updateChat($chatId, $messages)
    {
        $query = "UPDATE chats SET messages = :messages WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':messages', json_encode($messages));
        $stmt->bindParam(':id', $chatId);
        return $stmt->execute();
    }

    public function deleteChat($chatId)
    {
        $query = "DELETE FROM chats WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $chatId);
        return $stmt->execute();
    }
}
