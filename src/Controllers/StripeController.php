<?php

namespace App\Controllers;

use App\Controller;
use App\Models\User;

class StripeController extends Controller
{
    public function createCheckoutSession()
    {
        $userModel = new User();
        $user = $userModel->getUserData($_SESSION['user_id']);
        $this->render('app', ['user' => $user]);
    }
}
