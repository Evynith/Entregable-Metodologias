## Usar el sitio en local

### Si no se tiene clonado el repositorio git (tpe_metodologias) en "*C:\xampp\htdocs*"

1. Posicionarse con **git bash** en "*C:/xampp/htdocs*"
2. Ejecutar `git clone https://github.com/Federico-de-Muguruza/tpe_metodologias`
3. El repositorio está en "*C:/xampp/htdocs/tpe_metodologias*"

### Si nunca se ha activado el driver de postgres en xampp

[Guía](https://parzibyte.me/blog/2019/06/04/php-habilitar-extension-postgres-pdo-windows/)

**TODO**: Manejar en el "*api/web/mvc/models/Model.php*" la excepción producida por el error del driver y ofrecer al usuario el link de la documentación (¿video?) que resuelve el problema. (no olvidar **crear** la task antes y pasarla a **in progress**)

### Realizar consultas al sitio

**Recordar**:
- Tener el repositorio git en "*C:\xampp\htdocs*" y con su nombre original "*tpe_metodologias*"
- ***Ejecutar xampp***
- Como se está ejecutando desde local, la **ruta base** es "*localhost/tpe_metodologias/site*".
- Para rutas de la **app** agregar *app* a la ruta base
- Para rutas de la **api** agregar *api/web* a la ruta base
  - La carpeta */web/* es la carpeta que Heroku usa como **ruta base** de la *Api Rest* (ahi está *route.php*, *.htaccess*)

#### Con el navegador

Para ver los mensajes de consola se debe abrir la herramienta de desarrollo del navegador, usualmente se hace presionando la tecla f12.

#### Con Postman

Se deben importar los archivos de testeo creados para el sprint actual, por ejemplo el del sprint 3 se encuentra [aquí](../Tests/_templates), luego se debe correr el test.
En caso de utilizar Newman para exportarlo se debe instalar y ejecutar su inicio, puede usar esta [guía](https://adevait.com/qa/how-to-create-elegant-html-reports-in-postman).

#### Con cucumber

Se debe ir a la rama test y mergear las ramas a testar allí, las instrucciones de uso estan descriptas en su README.md