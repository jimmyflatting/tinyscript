<?php

namespace App;

use PDO;

class Model
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }
}
