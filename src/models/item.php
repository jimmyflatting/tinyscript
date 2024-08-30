<?php

namespace App\Models;

use App\Database;
use App\Model;
use PDOException;

class Item extends Model
{
    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function create($user_id, $message)
    {
        try {
            if (empty($message)) {
                throw new \InvalidArgumentException("Message cannot be empty");
            }

            $body = json_encode([
                ['user' => $message, 'ai' => null]
            ]);

            $id = $this->db->insert('items', [
                'user_id' => $user_id,
                'body' => $body,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
            return $this->read($id);
        } catch (PDOException $e) {
            error_log("Error creating item: " . $e->getMessage());
            throw new \RuntimeException("Failed to create item");
        }
    }

    public function read($id)
    {
        $item = $this->db->fetch('items', ['id' => $id]);
        if ($item) {
            $item['body'] = json_decode($item['body'], true);
        }
        return $item;
    }

    public function read_all($user_id)
    {
        $items = $this->db->fetchAll('items', ['user_id' => $user_id]);
        foreach ($items as &$item) {
            $item['body'] = json_decode($item['body'], true);
        }
        return $items;
    }

    public function update($id, $body)
    {
        $item = $this->read($id);
        if (!$item) {
            throw new \RuntimeException("Item not found");
        }

        return $this->db->update('items', [
            'body' => $body,
            'updated_at' => date('Y-m-d H:i:s'),
        ], ['id' => $id]);
    }

    public function delete($user_id)
    {
        return $this->db->delete('items', ['user_id' => $user_id]);
    }
}
