<?php

require_once './mvc/models/Model.php';
require_once "./mvc/view/JSONView.php";

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

    public function mostrar404() {
        $this->view->response(new Respuesta([
            'error' => new Exception("Ruta no reconocida: {$_GET[ 'action' ]}", 404)
        ]));
    }
}

?>