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

    public function postCartonero($params) {
        // $respuesta = parent::getData([
        //     'nombre' => FILTER_SANITIZE_STRING,
        //     'foto' => function ($foto) {
                
        //     },
        //     'direccion' => GeoChe::validarDireccion,
        //     'dni' => Filter::validarDNI
        // ]);
        $data = $this->getData();
        // var_dump($data);
        // die();
        // if ($respuesta->ok()) {
        $tieneTodo = !empty($data->nombre) && !empty($data->apellido) && !empty($data->dni) && !empty($data->direccion) && !empty($data->fecha_nacimiento) && !empty($data->vehiculo_volumen);   
        if ($tieneTodo) {
            // $respuesta = new Respuesta([
            //     'data' => $data
            // ]);
            $respuesta = $this->modelCartonero->post($data, [
                'id' => filter_var($params[ ':id' ] ?? null, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE),
                'returning' => 'id'
            ]);
        }
        else {
            $respuesta = new Respuesta([
                'error' => new Exception('400', 'Ingresar todos los datos')
            ]);    
        }
        
        // $respuesta->throw();
        $this->view->response($respuesta);

    }

    public function getCartonero($params) {
        $id = filter_var($params[ ':id' ], FILTER_VALIDATE_INT);
        // $r = $this->modelCartonero->selectById($id);
        $query =
        "SELECT c.id, dni, nombre, apellido, direccion, 
            to_char(fecha_nacimiento, 'DD/MM/YYYY') 
                as fecha_nacimiento,
            v.cod_categoria 
                as vehiculo_volumen
        FROM cartonero c
        JOIN volumen_materiales v on c.vehiculo_volumen = v.id
        WHERE c.id = ?";
        $r = Model::query($query, [
            'values' => [ $id ],
            'recurso' => 'cartonero',
            'fetchType' => 'fetch'
        ]);
        // if ($r->ok()) {
        //     $m = $r->get('material');
        //     $m->imagen = stream_get_contents($m->imagen);
        // }
        $this->view->response($r);
        // $r->throw();
    }

    public function deleteCartonero($params = []){
        $r = $this->modelCartonero->delete($params[':id']);
        $this->view->response($r);
    }
}
