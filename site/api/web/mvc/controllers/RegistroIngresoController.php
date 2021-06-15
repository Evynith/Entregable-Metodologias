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
        $id = $this->modelRegistroIngreso.postRegistroIngreso($data);

        if(isset($id)){
            $respuesta[ 'ok' ] = true;
            $respuesta[ 'id' ] = $id;
            $respuesta[ 'mensaje' ] = "El registro de ingreso de materiales fue cargado con exito";      
            $codigo = 200;
        }

        foreach ($data->materiales_cargados as $material) {

            if (!$this->modelRegistroIngreso->postMaterialCargado($data)) {

                $respuesta[ 'ok' ] = false;
                $respuesta[ 'mensaje' ] = "Los materiales no pudieron ser cargados";
                $codigo = 400;
            }
            
        }
        $this->view->response($respuesta, $codigo);
        
    }

}  