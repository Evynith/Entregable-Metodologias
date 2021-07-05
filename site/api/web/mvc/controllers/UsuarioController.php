<?php
require_once('./mvc/controllers/ApiController.php');

class UsuarioController extends ApiController {

    private $modelUsuario;

    public function __construct() {
        parent::__construct();
        $this->modelUsuario = new Model('usuario');
    }
    
    public function login() {

        $respuesta = new Respuesta; 
        $data = $this->getData();
        // $respuesta->setData($data);
        // $respuesta->throw();
        // die();

        if (!empty($data->usuario) && !empty($data->contrasenia)){

            $respuesta = $this->modelUsuario->query(
                "SELECT *
                 FROM usuario
                 WHERE usuario = ?
                ",
                [
                    'values'    => [$data->usuario],
                    'fetchType' => 'fetchAll',
                    'recurso'   => 'usuario'
                ]
            );
            if ($respuesta->ok()) {
                $usuario = $respuesta->get("usuario");

                // var_dump($usuario[0]->contrasenia);

                $coincidenContrasenias = password_verify($data->contrasenia, $usuario[0]->contrasenia);
                if($coincidenContrasenias) {
                    // Auth::login($usuario);
                } else {
                    $respuesta->setError(new Exception("La contraseña no coincide", 400));
                }
            } else {
                $respuesta->setError(new Exception("No existe el usuario", 400));
            }
        } else {
            $respuesta->setError(new Exception("Ingresar los datos requeridos", 400));
        }
        $this->view->response($respuesta);
    }

    public function postUsuario() {

        $respuesta = new Respuesta; 
        $data = $this->getData();

        // $respuesta->setData($data);
        // $respuesta->throw();
        // die();

        if (!empty($data->usuario) && !empty($data->contrasenia) && !empty($data->email)){

            var_dump(password_hash('admin', PASSWORD_DEFAULT));

            $data->contrasenia = password_hash($data->contrasenia, PASSWORD_DEFAULT);
            $respuesta = $this->modelUsuario->post($data,
                [
                    'returning' => 'id'
                ]
            );
            if ($respuesta->ok()) {
                $respuesta->setMensaje( "El registro de ingreso fue cargado con exito." );
            } else {
                $respuesta->setMensaje( 'Error en la carga del registro.' );
            }
        } else {
            $respuesta->setError(new Exception("Ingresar los datos requeridos", 400));
        }
        $this->view->response($respuesta);
    }

}