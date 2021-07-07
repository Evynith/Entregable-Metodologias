<?php

require_once('./mvc/controllers/ApiController.php');

class RegistroIngresoController extends ApiController {

 
    private $modelRegistroIngreso;
  
  
    public function __construct() {
        parent::__construct();
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
    }

    public function getMaterialesRecolectados($params) {
        $id = filter_var($params[ ':id' ], FILTER_VALIDATE_INT);
        $query = 
        'SELECT mh.nombre, sum(mc.peso) AS "pesoTotal"
        FROM material_historico mh
        JOIN material_cargado mc ON (mh.material_id = mc.id_material)
        JOIN registro_ingreso_material rim ON (mc.id_registro = rim.id_registro)
        WHERE rim.cartonero_id = ?
        -- AND mh.material_id IS NOT NULL
        GROUP BY mh.nombre';

        // Verificación:
        // $query2 =
        // 'SELECT *
        // from material_cargado mc 
        // join registro_ingreso_material rim on (mc.id_registro = rim.id_registro)
        // WHERE rim.cartonero_id = ?';

        $r = Model::query(
            $query, [
                'fetchType' => 'fetchAll',
                'recurso' => 'materialesRecolectados',
                'values' => [$id],
            ]);  
            // var_dump($r);
            $r->set('cartonero_id', $params[':id']);
            $this->view->response($r);
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
        define('TIPO_CARTONERO', 'Cartonero'); // ¿?
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
    }

}  