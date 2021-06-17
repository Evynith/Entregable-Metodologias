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
    public function getHistoricos() { 
        $materiales = $this->modelMaterial->getHistoricos();
        $this->view->response($materiales, 200);
    }  

    public function deleteMaterial($params = []) {
        $this->modelMaterial->deleteMaterial($params[':id']);
    }

    public function postMaterial($params) {
        $data = $this->getData();
        $data->nombre = filter_var($data->nombre ?? null, FILTER_SANITIZE_STRING);
        $data->imagen = filter_var($data->imagen ?? null, FILTER_SANITIZE_STRING);
        $data->descripcion = filter_var($data->descripcion ?? null, FILTER_SANITIZE_STRING);
        if ( ! empty($data->nombre) && ! empty($data->imagen)) {
            
            [ $resultado, $mensaje ] = isset($params[ ':id' ]) ? 
                $this->modelMaterial->postMaterial($data, filter_var($params[ ':id' ], FILTER_VALIDATE_INT)) : 
                $this->modelMaterial->postMaterial($data);
            
        }
        else {
            $resultado = false;
            $mensaje = 'Ingresar los datos requeridos';
        }
        
        $respuesta = [ 'ok' => $resultado ];
        // if (isset($params[ ':id' ])) {
        //     $respuesta[ 'mensaje' ] = $mensaje;
        // }
        // else {
        //     $respuesta[ 'id' ] = $mensaje;
        // }

        if (isset($params[ ':id' ])) {
            $respuesta[ 'mensaje' ] = $mensaje;
        }
        elseif ($respuesta[ 'ok' ]) {
            $respuesta[ 'id' ] = $mensaje;
            $respuesta[ 'mensaje' ] = 'El material se cargó con éxito';
        }
        else {
            $respuesta[ 'id' ] = null;
            $respuesta[ 'mensaje' ] = $mensaje;
        }
        
        $this->view->response($respuesta, $resultado ? 200 : 400);
        
    }
}
