<?php
require_once('./libs/GeoChe.php');
// require_once('./mvc/models/VolumenMaterialesModel.php');
// require_once('./mvc/models/FranjaHorariaModel.php');
// require_once('./mvc/models/AvisoRetiroModel.php');
require_once('./mvc/controllers/ApiController.php');

class AvisoRetiroController extends ApiController {

    private $modelFranjaHoraria; 
    private $modelVolumen;
    private $modelAvisoRetiro;
  
    public function __construct() {
        parent::__construct();
        // $this->modelFranjaHoraria = new FranjaHorariaModel();
        // $this->modelVolumen = new VolumenMaterialesModel();
        $this->modelFranjaHoraria = new Model('franja_horaria');
        $this->modelVolumen = new Model('volumen_materiales');
        $this->modelAvisoRetiro = new Model('aviso_retiro');
    }

    public function postAvisoRetiro() {
        // $r = parent::filterData([
        //     'nombre' => FILTER_SANITIZE_STRING,
        //     'apellido' => FILTER_SANITIZE_STRING,
        //     'direccion' => GeoChe::distanciaMenor,
        //     'id_horario' => FILTER_VALIDATE_INT,
        //     'id_volumen' => FILTER_VALIDATE_INT,
        //     'foto' => Filter::validarImagen
        // ], [ 'nombre', 'apellido', 'direccion', 'id_horario', 'id_volumen' ]);
        // if ($r->ok()) {
        //     $r = $this->modelAvisoRetiro->post($r->getData());
        // }
        // $r->throw();
        
        $respuesta = new Respuesta; 
        $data = $this->getData();
        if ( ! empty($data->nombre) && ! empty($data->apellido) && ! empty($data->direccion) && ! empty($data->id_horario) && ! empty($data->id_volumen)) {
            $g = new GeoChe('Hipólito Yrigoyen 1178', 'tandil');
            $distancia = $g->distanciaDe($data->direccion);
            
            //$respuesta[ 'distancia' ] = $distancia;
            if ($distancia > -1 && $distancia < 6000) {
                $respuesta = $this->modelAvisoRetiro->post($data, [
                    'returning' => 'id'
                ]);
                // if ($r->tiene('id')) {
                if ($respuesta->ok()) {
                    $respuesta->setMensaje("El aviso de retiro de material ha sido cargado con éxito, un recolector pasará por su casa dentro de los horarios elegidos..");
                }
                else {
                    // $respuesta[ 'ok' ] = false;
                    // $respuesta[ 'mensaje' ] = "Algo salió mal :(";
                    $respuesta->set('direccion', false);
                    // $codigo = 400;
                }
            } 
            else {
                $respuesta->setError(new Exception($distancia > -1 ? 
                    "Usted vive a más de 6km del centro de recolección, puede acercarse personalmente o vincularse a otros ciudadanos a traves de la cartelera de ofertas de transporte." : 
                    "No se encontró la dirección", 400)
                );
                $respuesta->set('direccion', $distancia > -1 ? true : false);
            }
        }
        else {
            $respuesta->setError(new Exception("Faltan ingresar datos", 400));
            $respuesta->set('direccion', false);
        }
        $respuesta->throw();
        
        // antes
        // $respuesta = []; 
        // $codigo;
        // $data = $this->getData();
        // if ( ! empty($data->nombre) && ! empty($data->apellido) && ! empty($data->direccion) && ! empty($data->id_horario) && ! empty($data->id_volumen)) {
        //     $g = new GeoChe('Hipólito Yrigoyen 1178', 'tandil');
        //     $distancia = $g->distanciaDe($data->direccion);
        //     //$respuesta[ 'distancia' ] = $distancia;
        //     if ($distancia > -1 && $distancia < 6000) {
        //         $id = $this->modelAvisoRetiro->saveAvisoRetiro($data);
        //         if (isset($id)) {
        //             $respuesta[ 'ok' ] = true;
        //             $respuesta[ 'id' ] = $id;
        //             $respuesta[ 'mensaje' ] = "El aviso de retiro de material ha sido cargado con éxito, un recolector pasará por su casa dentro de los horarios elegidos..";      
        //             $codigo = 200;
        //         }
        //         else {
        //             $respuesta[ 'ok' ] = false;
        //             $respuesta[ 'mensaje' ] = "Algo salió mal :(";
        //             $respuesta[ 'direccion' ] = false;
        //             $codigo = 400;
        //         }
        //     }
        //     else {
        //         $respuesta[ 'ok' ] = false;
                // $respuesta[ 'mensaje' ] = $distancia > -1 ? "Usted vive a más de 6km del centro de recolección, puede acercarse personalmente o vincularse a otros ciudadanos a traves de la cartelera de ofertas de transporte." : "No se encontró la dirección";
                // $respuesta[ 'direccion' ] = $distancia > -1 ? true : false;
        //         $codigo = 400;
        //     }
        // } 
        // else {
        //     $respuesta[ 'ok' ] = false;
        //     $respuesta[ 'mensaje' ] = "Faltan ingresar datos";
        //     $respuesta[ 'direccion' ] = false;
        //     $codigo = 400;
        // }
        // $this->view->response($respuesta, $codigo);
    }

    public function getFranjasHorarias() { 
        // $franjas = $this->modelFranjaHoraria->getFranjasHorarias();
        $r = $this->modelFranjaHoraria->selectAll('franjasHorarias');
        $r->throw();
    }  

    public function getVolumenesMateriales() { 
        // $volumenes = $this->modelVolumen->getVolumenesMateriales();
        $r = $this->modelVolumen->selectAll('volumenesMateriales');
        $r->throw();
    }  

    public function getAvisosRetiro() {
        $r = Model::query(
            "SELECT 
                a.id,
                fecha_emision,
                a.nombre,
                apellido,
                telefono,
                direccion,
                foto,
                f.nombre AS franja_horaria,
                cod_categoria
            FROM aviso_retiro a
                JOIN franja_horaria f       ON (f.id = a.id_horario)
                JOIN volumen_materiales m   ON (m.id = a.id_volumen)
            ORDER BY fecha_emision DESC", [
            'fetchType' => 'fetchAll',
            'recurso'   => 'avisosRetiro'
        ]);
        if ($r->ok()) {
            foreach($r->get('avisosRetiro') as $ar) {
                // Como foto es bytea, La db devuelve un RESOURCE. 
                // Hay que desempaquetarlo con stream_get_contents($imagen_de_db)  
                // ¡¡ para cada imagen devuelta !!
                $ar->foto = stream_get_contents($ar->foto);
            }
        }
        // $r->throw();
        $this->view->response($r);

        // $r = $this->modelAvisoRetiro->selectAll('avisosRetiro', 'vista_avisos_retiro');
        // $r->throw();
        // $avisos = $this->modelAvisoRetiro->getAvisosRetiro();
        // $this->view->response($avisos, 200);
    }
}  