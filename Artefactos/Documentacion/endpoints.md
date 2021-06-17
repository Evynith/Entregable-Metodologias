# Rutas del sitio (Endpoints) :construction_worker:

***Importante***:
- Si se ejecuta en local (con *xampp*), la **ruta base** es: "*localhost/tpe_metodologias/site/*".
  - Para rutas de la **app** agregar *app* a la ruta base (home = "*localhost/tpe_metodologias/site/app*).
  - Para rutas de la **api** agregar *api/web* a la ruta base (/franjas-horarias = "*localhost/tpe_metodologias/site/api/web/franjas-horarias*).
    - La carpeta */web/* es la carpeta que Heroku usa como **ruta base** de la *Api Rest* (ahi está *route.php*, *.htaccess*)

## App

| Ruta                                  | Acción | Descripción |
| -----------                           | ------ | ----------- |
| - | **SPRINT 1** | - |
| /                                     | GET    | Home        |
| /materiales-aceptados                 | GET    | Listado de materiales aceptados |
| /ofrecer-materiales                   | GET    | Formulario para crear una orden de retiro |
| -- | **SPRINT 2** | -- |
| /admin/avisos-retiro                  | GET    | Listado con los avisos de retiro cargados |
| /admin/materiales-aceptados/          | GET    | Listado editable de materiales aceptados |
| /admin/materiales-aceptados/:id       | GET    | Listado con edición del material :id |
| /admin/materiales-aceptados/agregar   | GET    | Listado con formulario para crear un nuevo material |
| /admin/registro-ingreso/              | GET    | Formulario para crear un registro de ingreso | 
| /admin/registro-ingreso/materiales    | GET    | Página para ingresar materiales al registro de ingreso | 

## Api REST

| Ruta                                  | Acción | Descripción |
| -----------                           | ------ | ----------- |
| - | **SPRINT 1** | - |
| /franjas-horarias                     | GET    | Array con las franjas horarias |
| /volumenes-materiales                 | GET    | Array con los volúmenes posibles |
| /aviso-retiro                         | POST   | Subir una orden de retiro |
| /materiales-aceptados                 | GET    | Array con los materiales aceptados |
| -- | **SPRINT 2** | -- |
| /admin/avisos-retiro                  | GET    | Array con los avisos de retiro cargadas |
| /admin/material-aceptado              | POST   | Agregar un nuevo material |
| /admin/material-aceptado/:id          | PUT    | Modificar el material :id |
| /admin/material-aceptado/:id          | DELETE | Eliminar el material :id |
| /admin/registro-ingreso               | POST   | Subir un registro de ingreso |
| /admin/tipos-usuario                  | GET    | Array con los tipos de usuario cargados |
| /admin/cartoneros                     | GET    | Array con los cartoneros cargados |
| /admin/materiales-historicos          | GET    | Array con los materiales historicos cuyo material_id no es null |
