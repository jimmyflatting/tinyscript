<?php

namespace App\Controllers;

use App\Controller;
use App\Models\User;
use App\Models\Item;

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

        $itemModel = new Item();
        $chats = $itemModel->read_all($user['id']);

        $this->render('app', ['user' => $user, 'chats' => $chats]);
    }
}
