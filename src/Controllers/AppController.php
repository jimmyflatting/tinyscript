<?php

namespace App\Controllers;

use App\Controller;
use App\Models\UserModel;

class AppController extends Controller
{
  private $userModel;

  public function __construct()
  {
    $this->userModel = new UserModel();
  }

  public function index()
  {
    $userId = $_SESSION['user_id'];
    $user = $this->userModel->getUser($userId);
    $this->render('app', ['user' => $user]);
  }
}
