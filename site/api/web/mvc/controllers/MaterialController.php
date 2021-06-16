<?php

require_once('./mvc/models/MaterialModel.php');
require_once('./mvc/controllers/ApiController.php');

class MaterialController extends ApiController {

    private $modelMaterial; 

    public function __construct() {
        parent::__construct();
        $this->modelMaterial = new MaterialModel();
    }
    
    public function getMateriales() { 
        $materiales = $this->modelMaterial->getMateriales();
        $this->view->response($materiales, 200);
    }  

    public function deleteMaterial($params = []) {
        $this->modelMaterial->deleteMaterial($params[':id']);
    }
}
