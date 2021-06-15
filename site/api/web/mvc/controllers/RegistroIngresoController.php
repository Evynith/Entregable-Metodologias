<?php

require_once('./mvc/models/RegistroIngresoModel.php');
require_once('./mvc/controllers/ApiController.php');

class RegistroIngresoController extends ApiController {

 
    private $modelRegistroIngreso;
  
  
    public function __construct() {
        parent::__construct();
        $this->modelRegistroIngreso = new RegistroIngresoModel();
       
    }

    public function postRegistroIngreso() {
        $respuesta = []; 
        $codigo;
        $data = $this->getData();
        var_dump($data);
        die();
       
    }

}  