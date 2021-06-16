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
    public function getHistoricos() {
        if ($this->db) {
            $q = $this->db->query('select id,nombre from unc_249456.material_historico where material_id is not null');
            $q->execute();
            $materiales = $q->fetchAll(PDO::FETCH_OBJ);
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
    
    public function postMaterial(StdClass $data, int $id = null): array {
        $table = 'unc_249456.material';
        $isEdit = is_numeric($id);
        $values = [];
        $str = "";
        $query = ( $isEdit ? "UPDATE $table SET " : "INSERT INTO $table(" ) .
            implode(',', array_map(function ($columna) use ($data, $isEdit, &$values, &$str) {
                $values[] = $data->{$columna};
                $str .= '?,';
                return $isEdit ? "$columna = ?" : "$columna";
            }, array_keys(get_object_vars($data)))) . 
            ( $isEdit ? " WHERE id = ?;" : ") VALUES($str" ); 

        if ( ! $isEdit) {
            $query = substr($query, 0, strlen($query)-1) . ');';
        }
        else {
            $values[] = $id;
        }
        // var_dump($query);
        // die();
        try {
            if ($this->db) {
                $q = Database::getConnection()->prepare($query);
                $q->execute($values);
                return [ true, $isEdit ? "ok" : $this->db->lastInsertId() ];
            }
            else {
                return [ false, "No se pudo conectar a la db" ];
            }
            // return $isEdit ? true : $this->db->lastInsertId();
        }
        catch(Exception $e) {
            return [ false, $e->getMessage() ];
        }
    }
}

