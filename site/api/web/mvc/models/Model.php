<?php

require_once ('./mvc/view/JSONView.php');
require_once './libs/Respuesta.php';

class Model {
    // protected $db;
    protected $tabla;

    function __construct(string $tabla = '') {
        $this->db = Database::getConnection();
        $this->tabla = $tabla;
    }

    // public static function query(string $query, array $values, string $fetchType = null, string $recurso = null): Respuesta {
    public static function query(string $query, array $opciones = []): Respuesta {
        $values     = $opciones[ 'values' ]     ?? [];   // parametros de la query (si tiene ?, ?, ?)
        $fetchType  = $opciones[ 'fetchType' ]  ?? null; // si devuelve la respuesta de la db [ fetch | fetchAll ]
        $recurso    = $opciones[ 'recurso' ]    ?? null; // el nombre con el que guarda la respuesta de la db 

        $r = new Respuesta();
        // $r->setData($opciones);
        // $r->throw();
        // die();
        try {
            $stm = Database::query($query, $values);
            // return [ true, $stm->fetchAll(PDO::FETCH_OBJ) ];
            if ( ! empty($fetchType) ) {
                $data = $stm->$fetchType(PDO::FETCH_OBJ);
                // $r->setData($data);
                // $r->throw();
                // die();
                if ( empty($recurso) ) {
                    $r->setData($data);
                }
                else {
                    // $r->setData($data);
                    // $r->throw();
                    // die();
                    $r->set($recurso, $data);
                    if ( ! $r->tiene($recurso) ) {
                        $r->setError(new Exception('No se pudo', 404));
                    }
                }
            }
        }
        catch (Exception $e) {
            // return [ false, $e->getMessage() ];
            $r->setError($e);
        }
        return $r;
    }

    // public function getAll(string $recurso = null): array {
    /*public function getAll(string $recurso = null): Respuesta {
        if ($recurso === null) {
            $recurso = $this->tabla;
        }
        $r = new Respuesta();
        try {
            $stm = Database::query("SELECT * FROM {$this->tabla};");
            // return [ true, $stm->fetchAll(PDO::FETCH_OBJ) ];
            $data = $stm->fetchAll(PDO::FETCH_OBJ);
            $r->set($recurso, $data);
        }
        catch (Exception $e) {
            // return [ false, $e->getMessage() ];
            $r->setError($e);
        }
        return $r;
        // if ($this->db) {
        //     try {
        //         $stm = $this->db->prepare(
        //             "SELECT *  
        //              FROM {$this->tabla}"
        //         );
        //         $stm->execute();
        //         // si se traen imagenes hacer stream_get_contents desde el controlador
        //         return [ true, $stm->fetchAll(PDO::FETCH_OBJ) ];
        //     }
        //     catch (Exception $e) {
        //         return [ false, $e->getMessage() ];
        //     }
        // }
        // else {
        //     return [ false, "No se pudo conectar a la db" ];
        // }
    }*/

    public function selectAll(string $recurso = null): Respuesta {
        if ( empty($recurso) ) {
            $recurso = $this->tabla;
        }
        $query = "SELECT * FROM {$this->tabla}";

        return self::query($query, [
            'fetchType' => 'fetchAll',
            'recurso' => $recurso
        ]);
    }
    
    public function selectById(int $id, string $recurso = null): Respuesta {
        if (empty($recurso)) {
            $recurso = $this->tabla;
        }
        $query = 
            "SELECT * 
            FROM {$this->tabla} 
            WHERE id = ?";

        $r = self::query($query, [
            'values' => [ $id ],
            'fetchType' => 'fetch',
            'recurso' => $recurso
        ]);

        if ($r->ok()) {
            if ($r->get($recurso) === false) {
                $r->setError(new Exception("no existe el id $id", 400));
                $r->set('id', $id);
            }
        }

        return $r;
        // $r = self::query(
        //     "SELECT * 
        //     FROM {$this->tabla} 
        //     WHERE id = ?",
        //     [ $id ],
        //     'fetch',
        //     $recurso
        // );
        // return $r;
        // try {
        //     $stm = Database::query(
        //         "SELECT * 
        //         FROM {$this->tabla} 
        //         WHERE id = ?"
        //     );
        //     return [ true, $stm->fetch(PDO::FETCH_OBJ) ];
        // }
        // catch (Exception $e) {
        //     return [ false, $e->getMessage() ];
        // }
        // if ($this->db) {
        //     try {
        //         $stm = $this->db->prepare(
        //             "SELECT * 
        //              FROM {$this->tabla} 
        //              WHERE id = ?"
        //         );
        //         $stm->execute([ $id ]);
        //         // si se traen imagenes hacer stream_get_contents desde el controlador
        //         return [ true, $stm->fetch(PDO::FETCH_OBJ) ];
        //     }
        //     catch (Exception $e) {
        //         return [ false, $e->getMessage() ];
        //     }
        // }
        // else {
        //     return [ false, "No se pudo conectar a la db" ];
        // }
    }

    // public function post(StdClass $data, ?int $id = null): Respuesta {
    public function post(StdClass $data, array $opciones = []): Respuesta {
        $id = $opciones[ 'id' ] ?? null;
        $isEdit = is_numeric($id);
        $returning = $opciones[ 'returning' ] ?? null;
        $values = [];
        $str = "";
        $query = ( $isEdit ? "UPDATE {$this->tabla} SET " : "INSERT INTO {$this->tabla}(" ) .
            implode(',', array_map(function ($columna) use ($data, $isEdit, &$values, &$str) {
                $values[] = $data->{$columna};
                $str .= '?,';
                return $isEdit ? "$columna = ?" : "$columna";
            }, array_keys(get_object_vars($data)))) . 
            ( $isEdit ? " WHERE id = ?" : ") VALUES($str" ); 

        if ( $isEdit ) {
            $values[] = $id;
        }
        else {
            $query = substr($query, 0, strlen($query)-1) . ')'; // saca la ultima coma y cierra el values()
        }

        if ( ! empty($returning) ) {
            $query .= ' RETURNING ' . $returning;
        }

        $r = self::query($query, [
            'values' => $values,
            'fetchType' => 'fetch'
        ]);
        
        if ( $r->ok() && ! empty($returning) ) {
            if ($r->tiene($returning)) {
                $r->setMensaje($r->get($returning) . ( $isEdit ? ' modificado' : ' agregado' ));
            }
            else { // error put (no existia el id)
                // $r->setError(new Exception("no existe el id $id"));
                $r->setError(new Exception("no existe el id $id", 400));
                $r->set('id', $id, true);
            }
        }

        return $r;
    //     if ( ! $isEdit ) {
    //         $query = substr($query, 0, strlen($query)-1) . ') RETURNING id;';
    //     }
    //     else {
    //         $values[] = $id;
    //     }

    //     $r = new Respuesta();
    //     try {
    //         $stm = Database::query($query, $values);
    //         if ($isEdit) {
    //             $r->setMensaje("$id modificado");
    //         }
    //         else {
    //             $r->set('id', $stm->fetch(PDO::FETCH_OBJ)->id);
    //         }
    //         // return [ true, $isEdit ? "$id modificado" : $stm->fetch(PDO::FETCH_OBJ)->id ];
    //     }
    //     catch (Exception $e) {
    //         $r->setError($e);
    //     }
    //     return $r;
    }

    public function delete(int $id): Respuesta {
        
        if ( empty($recurso) ) {
            $recurso = $this->tabla;
        }   
        $query = 
            "DELETE 
            FROM {$this->tabla} 
            WHERE id = ?
            RETURNING id";
        
        $r = self::query($query, [
            'values' => [ $id ],
            'fetchType' => 'fetch'
        ]);
        
        if ($r->ok()) {
            if ($r->tiene('id')) {
                $r->setMensaje($r->get('id') . ' eliminado');
            }
            else {
                $r->setError(new Exception("no existe el id $id", 400));
                $r->set('id', $id, true);
            }
        }
        // $r = new Respuesta();
        // try {
        //     $stm = Database::query(
        //         "DELETE 
        //          FROM {$this->tabla} 
        //          WHERE id = ?
        //          RETURNING *", [ $id ]    
        //     );
        //     // return [ true, "$id eliminado" ];
        //     $r->setMensaje("$id eliminado");
        // }
        // catch (Exception $e) {
        //     $r->setError($e);
        // }
        return $r;
        // if ($this->db) {
        //     try {
        //         $sentencia = $this->db->prepare(
        //             "DELETE 
        //              FROM {$this->tabla} 
        //              WHERE id = ?"
        //         );
        //         $sentencia->execute([ $id ]);
        //         return [ true, "$id eliminado" ];
        //     }
        //     catch (Exception $e) {
        //         return [ false, $e->getMessage() ];
        //     }
        // }
        // else {
        //     return [ false, "No se pudo conectar a la db" ];
        // }
    }

    // public static function query(string $stm) {
    // }

    // public function checkDb() {
    //     if (!$this->db) {
    //         throw new Exception(false, "No se pudo conectar a la db");
    //     }
    // }

}

class Database {

    private static $db; 

    private function __construct() {}

    public static function getConnection() {
        if (isset(self::$db)) {
            return self::$db;
        }
        else {
            try {
                self::$db = new PDO(
                    "pgsql:host=ec2-174-129-225-160.compute-1.amazonaws.com;port=5432;dbname=deh1iar4iml0ju",
                    "mbjldpmoeapiwl",
                    "5dffad59dade13ca1e67efdbbe94233662694126388f0ee60f1d4f3b960887b8",
                    array(
                        PDO::ATTR_TIMEOUT => 5,
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                    ));
                return self::$db;
            }
            catch (PDOException $e) {
                // var_dump($e);
                self::$db = false;
            }
        }
    }

    // public static function query(string $stm, array $values = []): PDOStatement|false {
    public static function query(string $stm, array $values = []): PDOStatement {
        $db = self::getConnection();
        if ($db === false) throw new Exception('No se pudo conectar a la db', 503);
        $query = $db->prepare($stm);
        $query->execute($values);
        return $query;
    }
}
