<?php

require_once './mvc/models/Model.php';
require_once "./mvc/view/JSONView.php";
require_once './libs/Respuesta.php';
require_once './libs/Auth.php';

class ApiController {

    protected $view;
    private $data; 

    public function __construct() {
        $this->view = new JSONView();
       
        $this->data = file_get_contents("php://input");
    }

    protected function getData(){ 
        return json_decode($this->data); 
    }

    protected function checkLogin() {
        if (!Auth::isLoggedIn()) {
            $this->view->response(new Respuesta([
                'error' => new Exception('No ingresó al sistema', 403)
            ]));
            die();
        }
    }

    public function logout() {
        Auth::logout();
        $this->view->response(new Respuesta([
            'mensaje' => 'Buen día/buenas tardes/buenas noches'
        ]));
    }

    public function mostrar404() {
        $this->view->response(new Respuesta([
            'error' => new Exception("Ruta no reconocida: {$_GET[ 'action' ]}", 404)
        ]));
    }
}

?>