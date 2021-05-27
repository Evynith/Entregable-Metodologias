<?php

require_once "./mvc/models/Model.php";
require_once "./libs/Router.php";


//ruta base 
//define("BASE_URL", 'http://'.$_SERVER["SERVER_NAME"].':'.$_SERVER["SERVER_PORT"].dirname($_SERVER["PHP_SELF"]).'/');

$resource = $_GET["action"];

// método utilizado
$method = $_SERVER["REQUEST_METHOD"];

// instancia el router
$router = new Router();

// arma la tabla de ruteo



// rutea
/* $router->route($resource, $method); */

new Model(); // control coneccion a la base de datos