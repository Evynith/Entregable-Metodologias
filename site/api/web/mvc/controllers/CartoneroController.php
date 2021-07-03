<?php

require_once('./mvc/controllers/ApiController.php');

class CartoneroController extends ApiController {

    private $modelCartonero; 

    public function __construct() {
        parent::__construct();
        $this->modelCartonero = new Model('cartonero');
    }
    
    public function getCartoneros() { 
        $r = Model::query(
            "SELECT id, nombre, apellido  
             FROM  cartonero", [
                 'fetchType' => 'fetchAll',
                 'recurso' => 'cartoneros'
             ]
        );
        // $r->throw();
        $this->view->response($r);
    }  

    // public function postCartonero($params) {
    //     $respuesta = parent::getData([
    //         'nombre' => FILTER_SANITIZE_STRING,
    //         'foto' => function ($foto) {
                
    //         },
    //         'direccion' => GeoChe::validarDireccion,
    //         'dni' => Filter::validarDNI
    //     ]);
    //     // $data = $this->getData();
    //     if ($respuesta->ok()) {
    //         $respuesta = $this->modelCartonero->post($data);
    //     }
        
    //     $respuesta->throw();

    // }
}
