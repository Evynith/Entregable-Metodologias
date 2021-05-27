<?php

require_once ('./mvc/view/JSONView.php');

class Model {
    protected $db;

    function __construct() {
        $HOST = 'dbases.exa.unicen.edu.ar';
        $PORT = '6432';
        $DB_NAME = 'cursada2021';
        $DB_USER = 'unc_249456';
        $DB_PASS = '249456';
        try {
            $this->db = new PDO(
                "pgsql:host=${HOST};port=${PORT};dbname=${DB_NAME}",
                $DB_USER,
                $DB_PASS,
                array(
                    PDO::ATTR_TIMEOUT => 3,
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                ));
            // var_dump("estoy conectado a la db");
        }
        catch (PDOException $e) {
            // var_dump($e);
            (new JSONView())->response([
                "mensaje" => "No se ha podido conectar a la base de datos"
            ], 503);
            die();
        }
    }
}