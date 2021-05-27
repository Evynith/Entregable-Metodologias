<?php

require_once('./mvc/models/Model.php');

class MaterialModel extends Model {

    public function getMateriales() {
        $sentencia = $this->db->prepare("SELECT * FROM  unc_249456.materiales");
        $sentencia->execute();
        $materiales = $sentencia->fetchAll(PDO::FETCH_OBJ);
        return $materiales;
    }	 
}

