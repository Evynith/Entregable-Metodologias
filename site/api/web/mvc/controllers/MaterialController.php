<?php

// require_once('./mvc/models/MaterialModel.php');
require_once('./mvc/controllers/ApiController.php');

class MaterialController extends ApiController {

    private $modelMaterial; 

    public function __construct() {
        parent::__construct();
        // $this->modelMaterialViejo = new MaterialModel();
        $this->modelMaterial = new Model('material');
        // $this->modelHistorico = new Model('material_historico');
    }
    
    public function getMateriales() { 
        $r = $this->modelMaterial->selectAll('materialesAceptados');
        if ($r->ok()) { // extraer imagenes
            foreach ($r->get('materialesAceptados') as $material) {
                $material->imagen = stream_get_contents($material->imagen);
            }
        }
        $this->view->response($r);
        // $r->throw();
            
        // $materiales = $this->modelMaterialViejo->getMateriales();
        // $this->view->response($materiales, 200);
    }  
    public function getMaterial($params) {
        $id = filter_var($params[ ':id' ], FILTER_VALIDATE_INT);
        $r = $this->modelMaterial->selectById($id);
        if ($r->ok()) {
            $m = $r->get('material');
            $m->imagen = stream_get_contents($m->imagen);
        }
        $this->view->response($r);
        // $r->throw();
    }
    public function getHistoricos() { 
        $r = Model::query(
            "SELECT id,nombre 
             FROM material_historico 
             WHERE material_id IS NOT NULL", [
                 'fetchType' => 'fetchAll',
                 'recurso' => 'materialesHistoricos'
             ]);
        
        // $materiales = $this->modelMaterial->getHistoricos();
        // $r = $this->modelHistorico->getAll('materialesHistoricos', [
        //     'where' => [ 'material_id', 'IS NOT', 'NULL' ]
        // ]);
        // $r = $this->modelHistorico->getAll(
        //     'materialesHistoricos',
        //     "SELECT * 
        //      FROM material_historico
        //      WHERE material_id IS NOT NULL"
        // );
        // $r->throw();
        $this->view->response($r);
        // $this->view->response($materiales, 200);
    }  

    public function deleteMaterial($params = []) {
        // $this->modelMaterial->deleteMaterial($params[':id']);
        // $this->view->response($this->modelMaterial->delete($params[':id']), 200);
        $r = $this->modelMaterial->delete($params[':id']);
        $this->view->response($r);
        // $r->throw();
    }

    public function postMaterial($params) {
        $data = $this->getData();
        $data->nombre = filter_var($data->nombre ?? null, FILTER_SANITIZE_STRING);
        $data->imagen = filter_var($data->imagen ?? null, FILTER_SANITIZE_STRING);
        $data->descripcion = filter_var($data->descripcion ?? null, FILTER_SANITIZE_STRING);

        $r = new Respuesta();

        if ( ! empty($data->nombre) && ! empty($data->imagen) ) {
            
            $opciones = [
                'id' => filter_var($params[ ':id' ] ?? null, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE),
                'returning' => 'id'
            ];
            $r = $this->modelMaterial->post($data, $opciones);

            // [ $resultado, $mensaje ] = $this->modelMaterial->post($data, filter_var($params[ ':id' ] ?? null, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE));
            // [ $resultado, $mensaje ] = isset($params[ ':id' ]) ? 
            //     $this->modelMaterial->postMaterial($data, filter_var($params[ ':id' ], FILTER_VALIDATE_INT)) : 
            //     $this->modelMaterial->postMaterial($data);
        }
        else {
            $r->setError(new Exception('Ingresar los datos requeridos', 400));
            // $resultado = false;
            // $mensaje = 'Ingresar los datos requeridos';
        }
        
        // $r->throw();
        $this->view->response($r);


        // $respuesta = [ 'ok' => $resultado ];
        // if (isset($params[ ':id' ])) {
        //     $respuesta[ 'mensaje' ] = $mensaje;
        // }
        // elseif ($respuesta[ 'ok' ]) {
        //     $respuesta[ 'id' ] = $mensaje;
        //     $respuesta[ 'mensaje' ] = 'El material se cargó con éxito';
        // }
        // else {
        //     $respuesta[ 'id' ] = null;
        //     $respuesta[ 'mensaje' ] = $mensaje;
        // }
        
        // $this->view->response($respuesta, $resultado ? 200 : 400);
        
    }
}
