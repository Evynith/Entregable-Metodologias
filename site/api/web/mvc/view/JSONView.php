<?php

require_once './libs/Respuesta.php';

class JSONView {

    /**
     * Convierte los datos de la respuesta a JSON y los imprime.
     */
    public function response($respuesta, int $status = 200) {
      // var_dump($data);
      try {
        $respuesta->throw();
      }
      catch (Exception $e) {
        header("Content-Type: application/json");
        header("HTTP/1.1 " . $status . " " . $this->_requestStatus($status));
        echo json_encode($respuesta);
      }
    }

    /**
     * Devuelve un mensaje de error dado un código de error HTTP.
     */
    private function _requestStatus($code){
        $status = array(
          200 => "OK",
          400 => "Bad Request",
          404 => "Not found",
          500 => "Internal Server Error",
          503 => "Service Unavailable"
        );
        return (isset($status[$code]))? $status[$code] : $status[500];
      }
}