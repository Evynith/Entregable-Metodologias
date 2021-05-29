<?php

require_once ('./mvc/view/JSONView.php');

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
            try {
                self::$db = new PDO(
                    "pgsql:host=ec2-174-129-225-160.compute-1.amazonaws.com;port=5432;dbname=deh1iar4iml0ju",
                    "mbjldpmoeapiwl",
                    "5dffad59dade13ca1e67efdbbe94233662694126388f0ee60f1d4f3b960887b8",
                    array(
                        PDO::ATTR_TIMEOUT => 3,
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
