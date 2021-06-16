<?php

require_once('./mvc/models/Model.php');

class RegistroIngresoModel extends Model {

    public function postRegistroIngreso($tipo_usuario, $cartonero_id): array {
        try {
            $stm = $this->db->prepare("INSERT INTO unc_249456.registro_ingreso_material (tipo_usuario, cartonero_id) VALUES(?, ?) RETURNING id_registro");
            $stm->execute( [ $tipo_usuario, $cartonero_id ] );
            return [ "ok" => true, "id" => $stm->fetch(PDO::FETCH_OBJ)->id_registro ];
            // return [ "ok" => true, "id" => $this->db->lastInsertId('unc_249456.registro_ingreso_material.id_registro') ]; // no funciona la referencia

            // return $this->db->lastInsertId('id_registro);
        }
        catch (Exception $e) {
            return [ "ok" => false, "mensaje" => $e->getMessage() ];
            // return [ "ok" => false, "mensaje" => "<span hidden>{$e->getMessage()}</span>" ];
        }
    }

    public function postMaterialCargado($id_registro, $id_material, $peso) {
        try {
            $stm = $this->db->prepare("INSERT INTO unc_249456.material_cargado (id_registro, id_material, peso) VALUES(?, ?, ?)");
            $stm->execute( [ $id_registro, $id_material, $peso ] );
            // $e = $stm->errorInfo(); 
            // var_dump($e);
            // die();
            return [ "ok" => true ];
        }
        catch (Exception $e) {
            return [ "ok" => false, "mensaje" => $e->getMessage() ];
            // return [ "ok" => false, "mensaje" => "<span hidden>{$e->getMessage()}</span>" ];
        }
    }


}
