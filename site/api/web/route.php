<?php
require_once "./mvc/controllers/CartoneroController.php";
require_once "./mvc/controllers/MaterialController.php";
require_once "./mvc/controllers/AvisoRetiroController.php";
require_once "./libs/Router.php";
require_once "./libs/GeoChe.php";
require_once "./mvc/controllers/RegistroIngresoController.php";
require_once "./mvc/controllers/UsuarioController.php";


$resource = $_GET["action"];

// método utilizado
$method = $_SERVER["REQUEST_METHOD"];

// instancia el router
$router = new Router();
$router->setDefaultRoute('ApiController', 'mostrar404');

// arma la tabla de ruteo

$router->addRoute("franjas_horarias", "GET", "AvisoRetiroController", "getFranjasHorarias");
$router->addRoute("volumenes_materiales", "GET", "AvisoRetiroController", "getVolumenesMateriales");
$router->addRoute("aviso_retiro","POST","AvisoRetiroController","postAvisoRetiro");
$router->addRoute("materiales-aceptados", "GET", "MaterialController", "getMateriales");
$router->addRoute("admin/cartoneros", "GET", "CartoneroController", "getCartoneros");
$router->addRoute("admin/materiales-historicos", "GET", "MaterialController", "getHistoricos");
$router->addRoute("admin/material-aceptado", "POST", "MaterialController", "postMaterial");
$router->addRoute("admin/material-aceptado/:id", "GET", "MaterialController", "getMaterial");
$router->addRoute("admin/material-aceptado/:id", "PUT", "MaterialController", "postMaterial");
$router->addRoute("admin/material-aceptado/:id", "DELETE", "MaterialController", "deleteMaterial");
$router->addRoute("admin/avisos-retiro", "GET", "AvisoRetiroController", "getAvisosRetiro");
$router->addRoute("admin/login", "POST", "UsuarioController", "login");
$router->addRoute("admin/registro", "POST", "UsuarioController", "postUsuario");
$router->addRoute("admin/materiales-recolectados/:id", "GET", "RegistroIngresoController", "getMaterialesRecolectados");

$router->addRoute("admin/registro-ingreso","POST","RegistroIngresoController","postRegistroIngreso");
$router->addRoute("admin/tipos-usuario","GET","RegistroIngresoController","getTiposUsuario");
// rutea
$router->route($resource, $method);

