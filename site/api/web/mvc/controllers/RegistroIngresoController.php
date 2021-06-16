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
        $codigo = 400;
        $data = $this->getData();
        $respuesta = $this->modelRegistroIngreso->postRegistroIngreso($data->tipo, $data->cartonero_id);

        if ($respuesta[ 'ok' ]) {

            $respuesta[ 'mensaje' ] = "El registro de ingreso de materiales fue cargado con exito";      
            $codigo = 200;
            $id_registro = $respuesta[ 'id' ];
            $cont_it = 0;
            $cont_tot = 0;

            foreach ($data->materiales_cargados as $m) { 
                $resp2 = $this->modelRegistroIngreso->postMaterialCargado($id_registro, $m->id_material, $m->peso);
                if ( ! $resp2[ 'ok' ]) {
                    // manejar falla en carga de material ingresado
                    $respuesta = $resp2; // se queda con el error
                    $codigo = 400;
                    break;
                }
                $cont_it++;
                $cont_tot += $m->peso;
            }

            $respuesta[ 'mensaje' ] .= $respuesta[ 'ok' ] ? 
                " ($cont_it por un total de $cont_tot kg)." :
                ". Error en la carga.";
        }

        $this->view->response($respuesta, $codigo);
        
    }

}  