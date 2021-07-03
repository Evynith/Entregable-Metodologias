<?php

require_once('./mvc/models/RegistroIngresoModel.php');
require_once('./mvc/controllers/ApiController.php');

class RegistroIngresoController extends ApiController {

 
    private $modelRegistroIngreso;
  
  
    public function __construct() {
        parent::__construct();
        // $this->modelRegistroIngreso = new ModelRegistroIngreso();
        $this->modelRegistroIngreso = new Model('registro_ingreso_material');
        $this->modelMaterialCargado = new Model('material_cargado');
     

    }

    public function getTiposUsuario() {

        $r = Model::query(
            "SELECT * FROM ( 
                SELECT unnest(enum_range(null::usuarios)) as tipo 
             ) as TIPOS", [
            'fetchType' => 'fetchAll',
            'recurso'   => 'tiposUsuario'
        ]);
        $r->set('TIPO_CARTONERO', 'Cartonero'); // ¿?
        // $r->throw(); 
        $this->view->response($r);
        // $respuesta = $this->modelRegistroIngreso->getTiposUsuario();
        // $respuesta[ 'TIPO_CARTONERO' ] = 'Cartonero'; // !¡cuidado!¡ 
        // $this->view->response($respuesta, $respuesta[ 'ok' ] ? 200 : 500);
    }

    public function postRegistroIngreso() {
        $data = $this->getData();

        $r = new Respuesta;

        // $materialesValidos = is_array($data->materiales_cargados) && 
        //     ( isset($data->materiales_cargados[0]) ?
        //         array_reduce($data->materiales_cargados, function ($tieneLoRequerido, $materialCargado) {
        //             return $tieneLoRequerido && (
        //                 ! empty($materialCargado->id_material = filter_var($materialCargado->id_material, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE)) && 
        //                 ! empty($materialCargado->nombre = filter_var($materialCargado->nombre, FILTER_SANITIZE_STRING, FILTER_NULL_ON_FAILURE)) && 
        //                 ! empty($materialCargado->peso = filter_var($materialCargado->peso, FILTER_VALIDATE_FLOAT, FILTER_NULL_ON_FAILURE)) 
        //             );
        //         }, true) : 
        //         false 
        //     );
        // $data->valido = $materialesValidos;
        // $r->setData($data);
        // $r->throw();
        // die();
        define('TIPO_CARTONERO', 'Cartonero');
        $registro = new StdClass;
        $registro->tipo_usuario = filter_var($data->tipo ?? null, FILTER_SANITIZE_STRING);
        $registro->cartonero_id = filter_var($data->cartonero_id ?? null, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE);
        $registroValido = ! empty($registro->tipo_usuario) && ( ! empty($registro->cartonero_id) || $registro->tipo_usuario != TIPO_CARTONERO );

        if ( $registroValido ) {
            $r = $this->modelRegistroIngreso->post($registro, [
                'returning' => 'id_registro'
            ]);
            $mensaje = '';
            if ($r->ok()) {
                $mensaje .= "El registro de ingreso fue cargado con exito.";
                $id_registro = $r->get('id_registro');

                foreach ($data->materiales_cargados as $m) {
                    // $materialCargado = new StdClass;
                    // $materialCargado->id_registro = $id_registro;
                    // $materialCargado->id_material = $m->id_material;
                    // $materialCargado->peso = $m->peso;
                    // $resp2 = $this->modelMaterialCargado->post($materialCargado);
                    $materialCargado = clone $m;
                    unset($materialCargado->nombre);
                    $materialCargado->id_registro = $id_registro;
                    $resp2 = $this->modelMaterialCargado->post($materialCargado);
                    if ( ! $resp2->ok() ) {
                        // manejar falla en carga de material ingresado
                        $r = $resp2; // se queda con el error
                        $mensaje .= ' Error en la carga de material.';
                        break;
                    }
                    // $cont_it++;
                    // $cont_tot += $m->peso;
                }
            }
            else {
                $mensaje .= 'Error en la carga del registro.';
                // throw
            }
            $r->setMensaje($mensaje);
        }
        else {
            $r->setError(new Exception('Ingresar todos los datos', 400));
        }
        // $r->throw();
        $this->view->response($r);

        // $respuesta = []; 
        // $codigo = 400;
        // $data = $this->getData();
        // $respuesta = $this->modelRegistroIngreso->postRegistroIngreso(
        //     filter_var($data->tipo ?? null, FILTER_SANITIZE_STRING), 
        //     filter_var($data->cartonero_id ?? null, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE)
        // );

        // if ($respuesta[ 'ok' ]) {

        //     $respuesta[ 'mensaje' ] = "El registro de ingreso de materiales fue cargado con exito";      
        //     $codigo = 200;
        //     $id_registro = $respuesta[ 'id' ];
        //     $cont_it = 0;
        //     $cont_tot = 0;

        //     foreach ($data->materiales_cargados as $m) { 
        //         $resp2 = $this->modelRegistroIngreso->postMaterialCargado($id_registro, $m->id_material, $m->peso);
        //         if ( ! $resp2[ 'ok' ]) {
        //             // manejar falla en carga de material ingresado
        //             $respuesta = $resp2; // se queda con el error
        //             $codigo = 400;
        //             break;
        //         }
        //         $cont_it++;
        //         $cont_tot += $m->peso;
        //     }

        //     $respuesta[ 'mensaje' ] .= $respuesta[ 'ok' ] ? 
        //         " ($cont_it por un total de $cont_tot kg)." :
        //         ". Error en la carga.";
        // }

        // $this->view->response($respuesta, $codigo);
        
    }

}  