<?php

namespace App\Controllers;

use App\Controller;

class AppController extends Controller
{
  public function index()
  {

    $this->render('app');
  }

  public function auth()
  {
    $this->render('login');
  }
}
