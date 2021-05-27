<?php
require_once ('./mvc/view/JSONView.php');

require_once "./mvc/view/JSONView.php";

abstract class ApiController {

    protected $view;
    private $data; 

    public function __construct() {
        $this->view = new JSONView();
       
        $this->data = file_get_contents("php://input");
    }

    protected function getData(){ 
        return json_decode($this->data); 
    }  

}

?>