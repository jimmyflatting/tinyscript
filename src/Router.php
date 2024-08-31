<?php

namespace App;

class Router
{
  private $routes = [];

  public function get($path, $controller, $action, $middleware = null)
  {
    $this->addRoute('GET', $path, $controller, $action, $middleware);
  }

  public function post($path, $controller, $action, $middleware = null)
  {
    $this->addRoute('POST', $path, $controller, $action, $middleware);
  }

  public function delete($path, $controller, $action, $middleware = null)
  {
    $this->addRoute('DELETE', $path, $controller, $action, $middleware);
  }

  public function put($path, $controller, $action, $middleware = null)
  {
    $this->addRoute('PUT', $path, $controller, $action, $middleware);
  }

  private function addRoute($method, $path, $controller, $action, $middleware)
  {
    $this->routes[] = [
      'method' => $method,
      'path' => $path,
      'controller' => $controller,
      'action' => $action,
      'middleware' => $middleware
    ];
  }

  public function dispatch()
  {
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    foreach ($this->routes as $route) {
      if ($route['method'] === $requestMethod && $route['path'] === $requestPath) {
        if ($route['middleware']) {
          $middlewareClass = $route['middleware'][0];
          $middlewareMethod = $route['middleware'][1];
          $middlewareClass::$middlewareMethod();
        }
        $controllerClass = $route['controller'];
        $controller = new $controllerClass();
        $action = $route['action'];
        $controller->$action();
        return;
      }
    }

    // If no route matches, render the 404 page
    $this->render404();
  }

  private function render404()
  {
    http_response_code(404);
    require __DIR__ . '/views/404.php';
  }
}
