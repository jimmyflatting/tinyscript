<?php

namespace App;

use PDO;
use PDOException;

class Database
{
    private static $instance = null;
    private $connection;

    private function __construct()
    {
        try {
            $host = $_ENV['DB_HOST'];
            $dbname = $_ENV['DB_NAME'];
            $username = $_ENV['DB_USER'];
            $password = $_ENV['DB_PASSWORD'];

            $this->connection = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function insert($table, $data)
    {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));
        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";

        error_log("SQL Query: " . $sql);
        error_log("Data: " . print_r($data, true));

        $stmt = $this->connection->prepare($sql);
        $stmt->execute(array_values($data));

        return $this->connection->lastInsertId();
    }

    public function fetch($table, $condition)
    {
        if ($condition === null) {
            $sql = "SELECT * FROM $table";
            $stmt = $this->connection->prepare($sql);
            $stmt->execute();
        } else {
            $sql = "SELECT * FROM $table WHERE ";
            $params = [];
            if (is_array($condition)) {
                $whereClauses = [];
                foreach ($condition as $key => $value) {
                    $whereClauses[] = "$key = :$key";
                    $params[":$key"] = $value;
                }
                $sql .= implode(' AND ', $whereClauses);
            } else {
                $sql .= $condition;
            }
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
        }
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function update($table, $data, $condition)
    {
        $set = [];
        $params = [];
        foreach ($data as $key => $value) {
            $set[] = "$key = :$key";
            $params[":$key"] = $value;
        }
        $setClause = implode(', ', $set);

        $whereClause = '';
        if (is_array($condition)) {
            $whereParts = [];
            foreach ($condition as $key => $value) {
                $whereParts[] = "$key = :where_$key";
                $params[":where_$key"] = $value;
            }
            $whereClause = implode(' AND ', $whereParts);
        } else {
            $whereClause = $condition;
        }

        $sql = "UPDATE $table SET $setClause WHERE $whereClause";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute($params);

        return $stmt->rowCount();
    }

    public function delete($table, $condition)
    {
        $sql = "DELETE FROM $table WHERE $condition";
        $this->connection->exec($sql);
    }

    public function fetchAll($table, $condition)
    {
        $sql = "SELECT * FROM $table";
        $params = [];

        if (!empty($condition)) {
            $sql .= " WHERE ";
            if (is_array($condition)) {
                $whereClauses = [];
                foreach ($condition as $key => $value) {
                    $whereClauses[] = "$key = :$key";
                    $params[":$key"] = $value;
                }
                $sql .= implode(' AND ', $whereClauses);
            } else {
                $sql .= $condition;
            }
        }

        $sql .= " ORDER BY updated_at DESC LIMIT 10";

        $stmt = $this->connection->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
