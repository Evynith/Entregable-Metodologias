<?php
require_once('./mvc/models/Model.php');

class FranjaHorariaModel extends Model{


public function getFranjasHorarias(){
    $sentencia = $this->db->prepare("SELECT * FROM  unc_249456.franja_horaria");
    $sentencia->execute();
    $franjas = $sentencia->fetchAll(PDO::FETCH_OBJ);
    return $franjas;
}	 

}