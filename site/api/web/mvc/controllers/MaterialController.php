<?php

require_once('./mvc/controllers/ApiController.php');

class MaterialController extends ApiController {

    private $modelMaterial; 

    public function __construct() {
        parent::__construct();
        $this->modelMaterial = new Model('material');
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
        // $r->throw();
        $this->view->response($r);
    }  

    public function deleteMaterial($params = []) {
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

        }
        else {
            $r->setError(new Exception('Ingresar los datos requeridos', 400));
        }
        
        // $r->throw();
        $this->view->response($r);
    }
}
