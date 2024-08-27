<?php

namespace App;

class RateLimiter
{
    private $redis;
    private $maxRequests = 60;
    private $perSeconds = 60;

    public function __construct()
    {
        $this->redis = new \Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }

    public function check($userId)
    {
        $key = "rate_limit:$userId";
        $current = $this->redis->get($key);

        if (!$current) {
            $this->redis->setex($key, $this->perSeconds, 1);
            return true;
        }

        if ($current >= $this->maxRequests) {
            return false;
        }

        $this->redis->incr($key);
        return true;
    }
}
