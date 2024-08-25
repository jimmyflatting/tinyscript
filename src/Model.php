<?php

namespace App;

use PDO;
use PDOException;

class Model
{
    protected $db;

    public function __construct()
    {
        try {
            $this->db = new PDO('sqlite:' . __DIR__ . '/../database.sqlite');
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }
}
