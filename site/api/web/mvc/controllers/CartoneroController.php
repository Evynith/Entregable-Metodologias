<?php

require_once('./mvc/models/CartoneroModel.php');
require_once('./mvc/controllers/ApiController.php');

class CartoneroController extends ApiController {

    private $modelCartonero; 

    public function __construct() {
        parent::__construct();
        $this->modelCartonero = new CartoneroModel();
    }
    
    public function getCartoneros() { 
        $cartoneros = $this->modelMaterial->getCartoneros();
        $this->view->response($cartoneros, 200);
    }  
}
