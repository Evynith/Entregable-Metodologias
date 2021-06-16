<?php
require_once('./mvc/models/Model.php');

class CartoneroModel extends Model{


public function getCartoneros(){
    if ($this->db) {
        $sentencia = $this->db->prepare("SELECT id, nombre, apellido  FROM  unc_249456.cartonero");
        $sentencia->execute();
        $cartoneros = $sentencia->fetchAll(PDO::FETCH_OBJ);
        return $cartoneros;
    }
    else {
        (new JSONView())->response([
            "ok" => false,
            "mensaje" => "No se ha podido conectar a la base de datos"
        ], 503);
        die();
    }
}	 

}