<?php class GeoChe {

    private $ciudad;
    private $direccion_base;
    
    public function __construct(string $d, string $c) {
        $this->direccion_base = GeoChe::geolocalizar($d, $c);
        if (empty($this->direccion_base)) throw new Exception("No se encontró la dirección base");
        $this->ciudad = $c;
    }

    /** Devuelve la distancia entre la dirección base y la recibida, o -1 si no la encuentra */
    public function distanciaDe(string $direccion): float {
        $direccion_destino = GeoChe::geolocalizar($direccion, $this->ciudad);
        if (empty($direccion_destino)) return -1;
        [ 'lat' => $lat1, 'lon' => $lon1 ] = $this->direccion_base;
        [ 'lat' => $lat2, 'lon' => $lon2 ] = $direccion_destino;
        return GeoChe::distanciaEntreCoordenadas($lat1, $lon1, $lat2, $lon2);
    }

    /**
     * Devuelve el resultado de la busqueda de "$direccion, $ciudad" en la api
     */
    public static function geolocalizar(string $direccion, string $ciudad = ''): array {
        $url = "https://nominatim.openstreetmap.org/search?q=$direccion,$ciudad&format=json&addressdetails=1";
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_USERAGENT  => "che", // sino nominatim rechaza la conexion
            CURLOPT_RETURNTRANSFER => 1 // true para devolver el resultado como string en vez de mostrarlo directamente.
        ]);
        $r = json_decode(curl_exec($ch), true); // true para array asociativo
        if (!empty($r)) $r = $r[ 0 ]; // si hay resultados, se queda con el primero
        curl_close($ch);
        return $r;
    }

    public static function existe(string $direccion, string $ciudad = ''): bool {
        return !empty(GeoChe::geocode($direccion, $ciudad));
    }

    public static function distanciaEntreCoordenadas($lat1, $lon1, $lat2, $lon2): float {
        $earthRadius = 6371000; // meters
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat/2) * sin($dLat/2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLon/2) * sin($dLon/2);

        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

        $dist = ($earthRadius * $c);
        return $dist;
    }
}
