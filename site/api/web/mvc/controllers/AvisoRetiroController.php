<?php
require_once('./libs/GeoChe.php');
require_once('./mvc/models/VolumenMaterialesModel.php');
require_once('./mvc/models/FranjaHorariaModel.php');
require_once('./mvc/models/AvisoRetiroModel.php');
require_once('./mvc/controllers/ApiController.php');

class AvisoRetiroController extends ApiController {

    private $modelFranjaHoraria; 
    private $modelVolumen;
    private $modelAvisoRetiro;
  

    public function __construct(){
        parent::__construct();
        $this->modelFranjaHoraria = new FranjaHorariaModel();
        $this->modelVolumen = new VolumenMaterialesModel();
        $this->modelAvisoRetiro = new AvisoRetiroModel();
    }

    public function postAvisoRetiro(){
        $respuesta = []; 
        $codigo;
        $data = $this->getData();
        if (!empty($data->direccion)) {
            $g = new GeoChe('Hipólito Yrigoyen 1178', 'tandil');
            $distancia = $g->distanciaDe($data->direccion);
            $respuesta[ 'distancia' ] = $distancia;
            if ($distancia > -1 && $distancia < 6000) {
                // $this->modelAvisoRetiro->saveAvisoRetiro($data->nombre, $data->apellido, $data->direccion,         
                //                     $data->telefono, $data->horario, $data->volumen, $data->imagen);
                $respuesta[ 'ok' ] = true;
                $respuesta[ 'mensaje' ] = "El aviso de retiro de material ha sido cargado con éxito, un recolector pasará por su casa dentro de los horarios elegidos..";      
                $codigo = 200;
            }
            else {
                $respuesta[ 'ok' ] = false;
                $respuesta[ 'mensaje' ] = $distancia > -1 ? "Usted vive a más de 6km del centro de recolección, puede acercarse personalmente o vincularse a otros ciudadanos a traves de la cartelera de ofertas de transporte." : "No se encontró la dirección";
                $respuesta[ 'direccion' ] = $distancia > -1 ? true : false;
                $codigo = 400;
            }
        }
        else {
            $respuesta[ 'ok' ] = false;
            $respuesta[ 'mensaje' ] = "Ingresar la dirección.";
            $respuesta[ 'direccion' ] = false;
            $codigo = 400;
        }
        $this->view->response($respuesta, $codigo);
    }
    /* ar: {
                nombre: '',
                apellido: '',
                direccion: '',
                telefono: '',
                horario: '',
                volumen: '',
                imagen: ''                
            } */


    

    public function getFranjasHorarias(){ 

        $franjas = $this->modelFranjaHoraria->getFranjasHorarias();
      
        $this->view->response($franjas, 200);
       
    }  

    public function getVolumenesMateriales(){ 

        $volumenes = $this->modelVolumen->getVolumenesMateriales();
        $this->view->response($volumenes, 200);
       
   }  
}  