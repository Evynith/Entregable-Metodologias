<?php
require_once('./mvc/models/VolumenMaterialesModel.php');
require_once('./mvc/models/FranjahorariaModel.php');
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
        $data = $this->getData();
        $this->modelAvisoRetiro->saveAvisoRetiro($data->nombre, $data->apellido, $data->direccion,         
                            $data->telefono, $data->horario, $data->volumen, $data->imagen);
        $this->view->response($data,200);                    
        var_dump($data);
        die;
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