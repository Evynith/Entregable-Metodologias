<?php

class Model {
    protected $db;
    function __construct() {
        $HOST = 'dbases.exa.unicen.edu.ar';
        $PORT = '6432';
        $DB_NAME = 'cursada2021';
        $DB_USER = 'unc_249456';
        $DB_PASS = '249456';
        try {
            $this->db = new PDO("pgsql:host=${HOST};port=${PORT};dbname=${DB_NAME};user=${DB_USER};password=${DB_PASS}");
            var_dump("estoy conectado a la db");
        }
        catch (PDOException $e) {
            var_dump($e);
        }
    }
}