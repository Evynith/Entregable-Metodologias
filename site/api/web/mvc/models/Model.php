<?php

class Model {
    protected $db;
    function __construct() {
        $this->db = Database::getConnection();
    }
}

class Database {

    private static $db; 

    private function __construct() {}

    public static function getConnection() {
        if (isset(self::$db)) {
            return self::$db;
        }
        else {
            $HOST = 'dbases.exa.unicen.edu.ar';
            $PORT = '6432';
            $DB_NAME = 'cursada2021';
            $DB_USER = 'unc_249456';
            $DB_PASS = '249456';
            try {
                self::$db = new PDO(
                    "pgsql:host=${HOST};port=${PORT};dbname=${DB_NAME}",
                    $DB_USER,
                    $DB_PASS,
                    array(
                        PDO::ATTR_TIMEOUT => 1,
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
}
