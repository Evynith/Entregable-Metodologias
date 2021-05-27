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
            $this->db = new PDO(
                "pgsql:host=${HOST};port=${PORT};dbname=${DB_NAME}",
                $DB_USER,
                $DB_PASS,
                array(
                    PDO::ATTR_TIMEOUT => 3,
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                ));
        }
        catch (PDOException $e) {
            // var_dump($e);
        }
    }
}