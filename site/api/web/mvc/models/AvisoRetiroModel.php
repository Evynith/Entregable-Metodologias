<?php

require_once('./mvc/models/Model.php');

class AvisoRetiroModel extends Model {

    public function saveAvisoRetiro($data) {
        try {
            $stm = $this->db->prepare("INSERT INTO unc_249456.aviso_retiro (nombre, apellido, telefono, direccion, foto, id_horario, id_volumen) VALUES(?, ?, ?, ?, ?, ?, ?)");
            $stm->execute([$data->nombre, $data->apellido, $data->telefono, $data->direccion, $data->foto, 
                        $data->id_horario, $data->id_volumen]);
            //$stm->errorInfo());
            return $this->db->lastInsertId();
        }
        catch (Exception $e) {
            return null;
        }
    }
}
