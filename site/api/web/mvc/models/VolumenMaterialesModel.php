<?php
require_once('./mvc/models/Model.php');

class VolumenMaterialesModel extends Model{


public function getVolumenesMateriales(){
    $sentencia = $this->db->prepare("SELECT * FROM  unc_249456.volumen_materiales");
    $sentencia->execute();
    $volumenes = $sentencia->fetchAll(PDO::FETCH_OBJ);
    return $volumenes;
}	 

}