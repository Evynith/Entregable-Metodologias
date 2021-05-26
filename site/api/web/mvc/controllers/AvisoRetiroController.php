<?php
require_once('./mvc/models/VolumenMaterialesModel.php');
require_once('./mvc/models/FranjahorariaModel.php');
require_once('./mvc/controllers/ApiController.php');

class AvisoRetiroController extends ApiController {

    private $modelFranjaHoraria; 
    private $modelVolumen;
   
  

    public function __construct(){
        parent::__construct();
        $this->modelFranjaHoraria = new FranjaHorariaModel();
        $this->modelVolumen = new VolumenMaterialesModel();
      

    }


    

    public function getFranjasHorarias(){ 

        $franjas = $this->modelFranjaHoraria->getFranjasHorarias();
      
        $this->view->response($franjas, 200);
       
    }  

    public function getVolumenesMateriales(){ 

        $volumenes = $this->modelVolumen->getVolumenesMateriales();
        $this->view->response($volumenes, 200);
       
   }  
}  