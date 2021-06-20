<?php

require_once('./mvc/models/Model.php');

class AvisoRetiroModel extends Model {

    public function saveAvisoRetiro($data) {
        try {
            $stm = $this->db->prepare("INSERT INTO aviso_retiro (nombre, apellido, telefono, direccion, foto, id_horario, id_volumen) VALUES(?, ?, ?, ?, ?, ?, ?)");
            $stm->execute([$data->nombre, $data->apellido, $data->telefono, $data->direccion, $data->foto, 
                        $data->id_horario, $data->id_volumen]);
            //$stm->errorInfo());
            return $this->db->lastInsertId();
        }
        catch (Exception $e) {
            return null;
        }
    }

    function getAvisosRetiro() {
        if ($this->db) {
            $sentencia = $this->db->prepare(
                "SELECT a.id,
                        fecha_emision,
                        a.nombre,
                        apellido,
                        telefono,
                        direccion,
                        foto,
                        f.nombre AS franja_horaria,
                        cod_categoria
                    FROM aviso_retiro a
                    JOIN franja_horaria f ON (f.id = a.id_horario)
                    JOIN volumen_materiales m ON (m.id = a.id_volumen)
                    ORDER BY fecha_emision DESC");
            $sentencia->execute();
            $avisos = $sentencia->fetchAll(PDO::FETCH_OBJ);

            foreach ($avisos as $aviso) {
                if ( ! empty($aviso->foto)) {
                    $desempaquetado = stream_get_contents($aviso->foto);
                    $aviso->foto = $desempaquetado;
                }
            }
            return $avisos;
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
