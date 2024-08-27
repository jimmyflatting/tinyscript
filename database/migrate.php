<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Database;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$db = Database::getInstance()->getConnection();

try {
    // Create users table
    $db->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        subscription_status ENUM('trial', 'active', 'inactive') DEFAULT 'trial',
        tokens_available INT DEFAULT 1000,
        subscription_start_date DATE,
        subscription_end_date DATE,
        stripe_subscription_id VARCHAR(255)
    )");

    // Create chats table
    $db->exec("CREATE TABLE IF NOT EXISTS chats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        messages TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");

    echo "Migration completed successfully.\n";
} catch (PDOException $e) {
    die("Migration failed: " . $e->getMessage() . "\n");
}
