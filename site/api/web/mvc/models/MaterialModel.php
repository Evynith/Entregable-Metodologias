<?php

require_once('./mvc/models/Model.php');

class MaterialModel extends Model {

    public function getMateriales() {
        if ($this->db) {
            $sentencia = $this->db->prepare("SELECT * FROM  unc_249456.materiales");
            $sentencia->execute();
            $materiales = $sentencia->fetchAll(PDO::FETCH_OBJ);

            foreach ($materiales as $material) {
                $desempaquetado = stream_get_contents($material->imagen);
                $material->imagen = $desempaquetado;
            }
            // var_dump(json_encode(stream_get_contents($materiales[0]->imagen))); // materiales[0].imagen
            // stream_get_contents() : https://www.php.net/manual/es/function.stream-get-contents.php
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

