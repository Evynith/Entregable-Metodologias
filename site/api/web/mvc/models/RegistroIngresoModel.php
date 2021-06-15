<?php

require_once('./mvc/models/Model.php');

class RegistroIngresoModel extends Model {

    public function postRegistroIngreso($data) {
        try {
            $stm = $this->db->prepare("INSERT INTO unc_249456.registro_ingreso_material (tipo_usuario, cartonero_id) VALUES(?, ?)");
            $stm->execute([$data->tipo, $data->cartonero_id]);
          
            return $this->db->lastInsertId();
        }
        catch (Exception $e) {
            return null;
        }
    }

    public function postMaterialCargado($data) {
        try {
            $stm = $this->db->prepare("INSERT INTO unc_249456.material_cargado (id_registro, id_material, peso) VALUES(?, ?, ?)");
            $stm->execute([$data->id_registro, $data->id_material, $data->peso]);
          
        }
        catch (Exception $e) {
            return null;
        }
    }


}
