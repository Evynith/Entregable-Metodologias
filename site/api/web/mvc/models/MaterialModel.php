<?php

require_once('./mvc/models/Model.php');

class MaterialModel extends Model {

    public function getMateriales() {
        if ($this->db) {
            $sentencia = $this->db->prepare("SELECT * FROM  unc_249456.materiales");
            $sentencia->execute();
            $materiales = $sentencia->fetchAll(PDO::FETCH_OBJ);
            return $materiales;
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

