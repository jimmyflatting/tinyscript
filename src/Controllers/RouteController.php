<?php

namespace App\Controllers;

use App\Controller;
use App\Models\User;

class RouteController extends Controller
{

    public function index()
    {
        $this->render('index');
    }

    public function app()
    {
        $userModel = new User();
        $user = $userModel->find($_SESSION['auth_token']);
        $this->render('app', ['user' => $user]);
    }
}
