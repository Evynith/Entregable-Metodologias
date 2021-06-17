
# Api

## TODO: respuestas get

## /aviso-retiro

- POST recibe
```JSON
{
    "nombre": "adssal",
    "apellido": "adakjsa",
    "direccion": "alem 55",
    "telefono": "249499999",
    "id_horario": 1,
    "id_volumen": 1,
    "foto": ""
}
```

- POST exitoso
```JSON
{
    "ok": true,
    "id": "11",
    "mensaje": "El aviso de retiro de material ha sido cargado con éxito, un recolector pasará por su casa dentro de los horarios elegidos.."
}
```

 - POST error datos (nombre, apellido, direccion)
```JSON
{
    "ok": false,
    "mensaje": "Faltan ingresar datos",
    "direccion": false
}
``` 
- POST error direccion
```JSON
{
    "ok": false,
    "mensaje": "No se encontró la dirección",
    "direccion": false
}
```
- POST error direccion > 6km
```JSON
{
    "ok": false,
    "mensaje": "Usted vive a más de 6km del centro de recolección, puede acercarse personalmente o vincularse a otros ciudadanos a traves de la cartelera de ofertas de transporte.",
    "direccion": true
}
```


- POST error de sql
```JSON
{
    "ok": false,
    "mensaje": "Algo salió mal :(",
    "direccion": false
}
```

## /admin/

### /admin/registro-ingreso

- POST recibe
```JSON
{
  "tipo": "Vecino buena onda",
  "cartonero_id": null,
  "materiales_cargados": [
    {
      "id_material": 5,
      "nombre": "Tapitas",
      "peso": 3
    },
    {
      "id_material": 3,
      "nombre": "Papel",
      "peso": 2
    }
  ]
}
```

- POST exitoso
```JSON
{
    "ok": true,
    "id": 57,
    "mensaje": "El registro de ingreso de materiales fue cargado con exito (2 por un total de 5 kg)."
}
```
- POST error
```JSON
{
    "ok": false,
    "mensaje": "SQLSTATE[22P02]: Invalid text representation: 7 ERROR:  invalid input syntax for type integer: \"asd\". Error en la carga."
}
```

### /admin/material-aceptado
### /admin/material-aceptado/:id

- POST y POST reciben
```JSON
{
    "nombre": "3213213",
    "imagen": "adsadsa",
    "descripcion": "asdsad"
}
```

- POST exitoso
```JSON
{
    "ok": true,
    "id": "17",
    "mensaje": "El material se cargó con éxito"
}
```
- POST error
```JSON
{
    "ok": false,
    "id": null,
    "mensaje": "SQLSTATE[23505]: Unique violation: 7 ERROR:  duplicate key value violates unique constraint \"nombre_ak\"\nDETAIL:  Key (nombre)=(sadsad) already exists."
}
```

- PUT exitoso
```JSON
{
    "ok": true,
    "mensaje": "ok"
}
```

- DELETE exitoso
```JSON
{
    "ok": true
}
```