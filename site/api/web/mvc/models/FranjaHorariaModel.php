<?php
require_once('./mvc/models/Model.php');

class FranjaHorariaModel extends Model{


// public function getFranjasHorarias(){
//     if ($this->db) {
//         $sentencia = $this->db->prepare("SELECT * FROM  franja_horaria");
//         $sentencia->execute();
//         $franjas = $sentencia->fetchAll(PDO::FETCH_OBJ);
//         return $franjas;
//     }
//     else {
//         (new JSONView())->response([
//             "ok" => false,
//             "mensaje" => "No se ha podido conectar a la base de datos"
//         ], 503);
//         die();
//     }
// }	 

}