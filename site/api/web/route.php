<?php

require_once "./mvc/controllers/MaterialController.php";
require_once "./libs/Router.php";


//ruta base 
//define("BASE_URL", 'http://'.$_SERVER["SERVER_NAME"].':'.$_SERVER["SERVER_PORT"].dirname($_SERVER["PHP_SELF"]).'/');

$resource = $_GET["action"];

// método utilizado
$method = $_SERVER["REQUEST_METHOD"];

// instancia el router
$router = new Router();

// arma la tabla de ruteo
$router->addRoute("materiales_aceptados", "GET", "MaterialController", "getMateriales");

// rutea
$router->route($resource, $method); 
