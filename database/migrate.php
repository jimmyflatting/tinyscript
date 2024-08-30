<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Database;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$db = Database::getInstance()->getConnection();

try {
    // Drop the existing users table if it exists
    $db->exec("DROP TABLE IF EXISTS items");
    $db->exec("DROP TABLE IF EXISTS users");

    // Create users table
    $db->exec("CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255),
        available_tokens INT DEFAULT 1000,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        subscription_status BOOLEAN DEFAULT FALSE,
        subscription_date TIMESTAMP NULL,
        subscription_renewal TIMESTAMP NULL,
        stripe_subscription_id VARCHAR(255)
    )");

    // Create items table
    $db->exec("CREATE TABLE items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        body JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");

    echo "Migration completed successfully.\n";
} catch (PDOException $e) {
    die("Migration failed: " . $e->getMessage() . "\n");
}
