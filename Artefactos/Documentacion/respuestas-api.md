
# Api

## Sprint 1

### GET /franjas_horarias
```JSON
{
    "ok": true,
    "data": {
        "franjasHorarias": [
            {
                "id": 1,
                "nombre": "9 a 12hs"
            },
            {
                "id": 2,
                "nombre": "13 a 17hs"
            }
        ]
    }
}
```
### GET /volumenes_materiales
```JSON
{
    "ok": true,
    "data": {
        "volumenesMateriales": [
            {
                "id": 1,
                "cod_categoria": "A",
                "categoria": "Caja"
            },
            {
                "id": 2,
                "cod_categoria": "B",
                "categoria": "Baúl de un auto"
            },
            {
                "id": 3,
                "cod_categoria": "C",
                "categoria": "Camioneta"
            },
            {
                "id": 4,
                "cod_categoria": "D",
                "categoria": "Camión"
            }
        ]
    }
}
```
### POST /aviso-retiro
- recibe
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
- devuelve
```JSON
{
    "ok": true,
    "id": "11",
    "mensaje": "El aviso de retiro de material ha sido cargado con éxito, un recolector pasará por su casa dentro de los horarios elegidos.."
}
```
 - error datos (nombre, apellido, direccion)
```JSON
{
    "ok": false,
    "mensaje": "Faltan ingresar datos",
    "direccion": false
}
``` 
- error direccion
```JSON
{
    "ok": false,
    "mensaje": "No se encontró la dirección",
    "direccion": false
}
```
- error direccion > 6km
```JSON
{
    "ok": false,
    "mensaje": "Usted vive a más de 6km del centro de recolección, puede acercarse personalmente o vincularse a otros ciudadanos a traves de la cartelera de ofertas de transporte.",
    "direccion": true
}
```
- error de sql
```JSON
{
    "ok": false,
    "mensaje": "Algo salió mal :(",
    "direccion": false
}
```
### GET /materiales-aceptados
```JSON
{
    "ok": true,
    "data": {
        "materialesAceptados": [
            {
                "id": 1,
                "nombre": "Plástico",
                "imagen": ".....",
                "descripcion": "Los envases deben estar limpios y aplastados.No se aceptan envases de:<ul><li>Yogurt</li><li>Queso blanco</li></ul>"
            }, 
            {}
        ]
    }
}
```

## Sprint 2

### GET /admin/avisos-retiro
```JSON
{
    "ok": true,
    "data": {
        "avisosRetiro": [
            {
                "id": 19,
                "fecha_emision": "2021-06-29 01:13:17.568029+00",
                "nombre": "Juan",
                "apellido": "Perez",
                "telefono": "2494121212",
                "direccion": "Alem 503",
                "foto": "",
                "franja_horaria": "9 a 12hs",
                "cod_categoria": "A"
            },
            {}
        ]
    }
}
```
### GET /admin/tipos-usuario
```JSON
{
    "ok": true,
    "data": {
        "tiposUsuario": [
            {
                "tipo": "Vecino buena onda"
            },
            {
                "tipo": "Cartonero"
            }
        ],
        "TIPO_CARTONERO": "Cartonero"
    }
}
```
### GET /admin/cartoneros
```JSON
{
    "ok": true,
    "data": {
        "cartoneros": [
            {
                "id": 1,
                "nombre": "Jacinto",
                "apellido": "Martinez"
            },
            {}
        ]
    }
}
```
### GET /admin/materiales-historicos
```JSON
{
    "ok": true,
    "data": {
        "materialesHistoricos": [
            {
                "id": 1,
                "nombre": "Plástico"
            },
            {}
        ]
    }
}
```
### POST /admin/registro-ingreso
- recibe
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
- devuelve
```JSON
{
    "ok": true,
    "mensaje": "El registro de ingreso fue cargado con exito.",
    "data": {
        "id_registro": 22
    }
}
```
### POST /admin/material-aceptado
### PUT /admin/material-aceptado/:id
- reciben
```JSON
{
    "nombre": "3213213",
    "imagen": "adsadsa",
    "descripcion": "asdsad"
}
```
- devuelven
```JSON
{ // POST
    "ok": true,
    "mensaje": "65 agregado",
    "data": {
        "id": 65
    }
}
{ // PUT
    "ok": true,
    "mensaje": "65 modificado",
    "data": {
        "id": 65
    }
}
```
- error
```JSON
{ // POST
    "ok": false,
    "error": "SQLSTATE[23505]: Unique violation: 7 ERROR:  duplicate key value violates unique constraint \"nombre_ak\"\nDETAIL:  Key (nombre)=(123) already exists."
}
{ // PUT
    "ok": false,
    "error": "no existe el id 65",
    "data": {
        "id": 65
    }
}
```
### DELETE /admin/material-aceptado/:id
- devuelve
```JSON
{
    "ok": true,
    "mensaje": "65 eliminado",
    "data": {
        "id": 65
    }
}
```
- error
```JSON
{
    "ok": false,
    "error": "no existe el id 65",
    "data": {
        "id": 65
    }
}
```

## Sprint 3

### GET /admin/material-aceptado/:id
- devuelve
```JSON
{
    "ok": true,
    "data": {
        "material": {
            "id": 67,
            "nombre": "123",
            "imagen": "123",
            "descripcion": "123"
        }
    }
}
```
- error
```JSON
{
    "ok": false,
    "error": "no existe el id 65",
    "data": {
        "material": false,
        "id": 65
    }
}
```
### GET /admin/materiales-recolectados/:cartonero_id
- devuelve
```JSON
{
    "ok": true,
    "data": {
        "cartonero_id": 1,
        "materialesRecolectados": [
            {
                "nombre": "Tapitas",
                "pesoTotal": 10
            },
            {
                "nombre": "Botellas",
                "pesoTotal": 20
            }
        ]
    }
}
```
### GET /admin/cartonero/:id
- devuelve
```JSON
{
    "ok": true,
    "data": {
        "cartonero": {
            "id": 1,
            "dni": 33222111,
            "nombre": "Jacinto",
            "apellido": "Martinez",
            "direccion": "los sauces 2200",
            "fecha_nacimiento": "23/06/1900",
            "vehiculo_volumen": "C" // __no el id__
        }
    }
}
```
- error
```JSON
{
    "ok": false,
    "error": "no existe el id 1",
    "data": {
        "cartonero": false,
        "id": 1
    }
}
```
### POST /admin/cartonero
### PUT  /admin/cartonero/:id
- reciben
```JSON
{
    "dni": 33222111,
    "nombre": "Jacinto",
    "apellido": "Martinez",
    "direccion": "los sauces 2200",
    "fecha_nacimiento": "23/06/1900",
    "vehiculo_volumen": 1 // __el id__
}
```
- devuelven
```JSON
{ // POST
    "ok": true,
    "mensaje": "65 agregado",
    "data": {
        "id": 65
    }
}
{ // PUT
    "ok": true,
    "mensaje": "65 modificado",
    "data": {
        "id": 65
    }
}
```
- error
```JSON
{ // POST
    "ok": false,
    "error": "SQLSTATE[23505]: Unique violation: 7 ERROR:  duplicate key value violates unique constraint \"dni_ak\"\nDETAIL:  Key (dni)=(33222111) already exists."
}
{ // PUT
    "ok": false,
    "error": "no existe el id 65",
    "data": {
        "id": 65
    }
}
```
### DELETE /admin/cartonero/:id
- devuelve
```JSON
{
    "ok": true,
    "mensaje": "65 eliminado",
    "data": {
        "id": 65
    }
}
```
- error
```JSON
{
    "ok": false,
    "error": "no existe el id 65",
    "data": {
        "id": 65
    }
}
```
### POST /admin/registro
-recibe
```JSON
 {
    "usuario": "admin",
    "contrasenia": "admin",
    "email": "admin@admin",
}
```
- devuelve
```JSON
{ // POST
    "ok": true,
    "mensaje": "1 agregado",
    "data": {
        "id": 1
    }
}
```
- error
```JSON
{ // POST
    "ok": false,
    "error": "SQLSTATE[23505]: Unique violation: 7 ERROR:  duplicate key value violates unique constraint \"usuario_ak\"\nDETAIL:  Key (usuario)=(admin) already exists."
}
{ // POST
    "ok": false,
    "error": "SQLSTATE[23505]: Unique violation: 7 ERROR:  duplicate key value violates unique constraint \"email_ak\"\nDETAIL:  Key (email)=(admin@admin) already exists."
}
```
### POST /admin/login
```JSON
 {
    "usuario": "admin",
    "contrasenia": "admin"
}
```
- devuelve
```JSON
{ // POST
    "ok": true,
    "mensaje": "Logeado con éxito",
    "data": {
        "usuario": {
            "usuario": "admin",
            "email": "admin@admin",
            "contrasenia": "$2y$10$zv0dhP9RM4VFCmz3VIuQQuSSWR6/y50ltcUVwpe4oq1r6oDtN1T4u"
        }
    }
}
```
- error
```JSON
{
    "ok": false,
    "error": "no existe el usuario admin",
    "data": {
        "usuario": "admin"
    }
}
```