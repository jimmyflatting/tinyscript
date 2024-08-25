<?php

require '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

session_start();

require '../lib/general-template.php';

$router = require '../src/Routes/index.php';
