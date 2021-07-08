<?php class Respuesta {

    private array $headers;
    private Exception $error;
    private string $mensaje;
    private array $data;

    // public function __construct(Exception $e = null) {
    //     $this->setError($e);
    //     $this->headers = [ "Content-Type: application/json" ];
    // }
    public function __construct(array $opciones = []) {
        $this->headers = [ "Content-Type: application/json" ];
        $this->setError($opciones[ 'error' ] ?? null);
        $this->setMensaje($opciones[ 'mensaje' ] ?? '');
        $this->data = [];
        if (isset($opciones[ 'data' ])) {
            foreach ($opciones[ 'data' ] as $nombre => $valor) {
                $this->set($nombre, $valor);
            }
        }
    }

    public function statusCode(): int {
        // var_dump($this->error);
        // die();
        return isset($this->error) ? 
            $this->error->getCode() :
            200;
        // if ( isset($this->error) ) {
        //     return $this->error->getCode();
        // }
        // else {
        //     return 200;
        // }
    }
    public function setHeader(string $h) {
        if ( ! in_array($h, $this->headers) ) {
            $this->headers[] = $h;
        }
    }
    public function setError(?Exception $e) {
        if ( isset($e) ) {
            $this->error = $e;
        }
    }
    public function setMensaje(string $m) {
        $this->mensaje = $m;
    }

    public function setData(mixed $d) {
        $this->data = (array) $d;
    }
    public function set(string $propiedad, mixed $valor, bool $resetData = false) {
        if ($resetData) {
            $this->data = []; 
        }
        $this->data[ $propiedad ] = $valor;
    }
    public function tiene(string $prop): bool {
        return isset($this->data[ $prop ]);
    }
    public function &get(string $propiedad): mixed {
        return $this->data[ $propiedad ];
    }
    public function &getData(): array {
        return $this->data;
    }

    public function ok(): bool {
        return $this->statusCode() == 200 ? true : false;
    }

    public function throw() {
        $this->_printHeaders();
        $r = [ "ok" => $this->ok() ];
        if (!empty($this->mensaje)) $r[ 'mensaje' ] = $this->mensaje;
        if (!empty($this->error))   $r[ 'error' ]   = $this->error->getMessage();
        if (!empty($this->data))    $r[ 'data' ]    = $this->data;
        echo json_encode($r);
    }

    /**
     * Devuelve un mensaje de error dado un código de error HTTP.
     */
    private static function _requestStatus(int $code){
        $status = array(
            200 => "OK",
            400 => "Bad Request",
            404 => "Not found",
            500 => "Internal Server Error",
            503 => "Service Unavailable"
        );
        return ( isset($status[$code]) ) ? $status[$code] : $status[500];
    }

    private function _printHeaders() {
        foreach ($this->headers as $h) {
            header($h);
        }
        header("HTTP/1.1 {$this->statusCode()} " . self::_requestStatus($this->statusCode()));
    }

}