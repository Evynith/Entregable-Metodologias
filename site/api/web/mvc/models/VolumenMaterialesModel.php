<?php
require_once('./mvc/models/Model.php');

class VolumenMaterialesModel extends Model{


public function getVolumenesMateriales(){
    if ($this->db) {
        $sentencia = $this->db->prepare("SELECT * FROM  volumen_materiales");
        $sentencia->execute();
        $volumenes = $sentencia->fetchAll(PDO::FETCH_OBJ);
        return $volumenes;
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