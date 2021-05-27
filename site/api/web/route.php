<?php

require_once "./libs/Router.php";
require_once "./libs/GeoChe.php";

require_once "./mvc/controllers/AvisoRetiroController.php";


$resource = $_GET["action"];

// método utilizado
$method = $_SERVER["REQUEST_METHOD"];

// instancia el router
$router = new Router();

// arma la tabla de ruteo

$router->addRoute("franjas_horarias", "GET", "AvisoRetiroController", "getFranjasHorarias");
$router->addRoute("volumenes_materiales", "GET", "AvisoRetiroController", "getVolumenesMateriales");
$router->addRoute("aviso_retiro","POST","AvisoRetiroController","postAvisoRetiro");
/* $router->addRoute("avisoRetiro", "POST", "AvisoRetiroController", "postAvisoRetiro");
$router->addRoute("materiales", "GET", "AvisoRetiroController", "getMateriales"); */

// rutea
$router->route($resource, $method);
