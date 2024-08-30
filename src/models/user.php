<?php

namespace App\Models;

use App\Database;
use App\Model;

class User extends Model
{
    private $id;
    private $email;
    private $name;
    private $password;
    private $credits;
    private $subscription_status;
    private $subscription_date;
    private $subscription_renewal;
    private $stripe_subscription_id;
    protected $db;

    public function __construct(int $id = 0, string $email = '', string $name = '', string $password = '')
    {
        $this->id = $id;
        $this->email = $email;
        $this->name = $name;
        $this->password = $password;
        $this->credits = 0;
        $this->db = Database::getInstance();
    }

    public function create($email, $name, $password)
    {
        return $this->db->insert('users', [
            'email' => $email,
            'name' => $name,
            'password' => $password,
            'available_tokens' => 1000,
            'subscription_status' => false,
            'subscription_date' => null,
            'subscription_renewal' => null,
            'stripe_subscription_id' => null,
        ]);
    }

    public function find(int $user_id): ?array
    {
        $condition = "id = " . $user_id;
        $user = $this->db->fetch('users', $condition);
        return $user ?: null;
    }

    public function read(string $user_email): ?array
    {
        $condition = "email = '" . addslashes($user_email) . "'";
        $user = $this->db->fetch('users', $condition);
        return $user ?: null;  // Return null if no user found
    }

    public function update(int $user_id, array $data): void
    {
        $condition = "id = " . $user_id;
        $this->db->update('users', $data, $condition);
    }

    public function delete(int $user_id): bool
    {
        $this->db->delete('users', $user_id);
        $this->id = 0;
        $this->email = '';
        $this->name = '';
        $this->password = '';
        $this->credits = 0;

        return true;
    }

    public function getUserCredits(int $user_id): int
    {
        $condition = "user_id = " . $user_id;
        $user = $this->db->fetch('users', $condition);
        return $user['available_tokens'] ?? 0;
    }
}
