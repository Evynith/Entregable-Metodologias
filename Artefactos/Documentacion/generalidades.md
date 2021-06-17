# Generalidades :mask:

## Reglas generales de desarrollo

### Implementación de funcionalidades (programación)

- El desarrollo de cada US tiene como **rama principal** a una rama llamada `#CODIGO_US` que se creará en el momento de empezar a desarrollar esa US.
- El desarrollo de las funcionalidades de la US que refieren a la *API Rest* tiene como rama principal a una rama llamada `#CODIGO_US-API` que se creará en el momento de empezar a desarrollar funcionalidades **de (y solo de)** la *API Rest*, es decir "*tpe_metodologias/site/api/web/\**".
- El desarrollo de las funcionalidades de la US que refieren a la *APP* tiene como rama principal a una rama llamada `#CODIGO_US-APP` que se creará en el momento de empezar a desarrollar funcionalidades **de (y solo de)** la *APP*, es decir "*tpe_metodologias/site/app/\**".
- Si se considera necesario se puede crear una **subrama** desde la rama de desarrollo principal de la funcionalidad que se esté desarrollando (*API Rest*, *APP*), que se va a llamar como la rama padre más el código de la Task correspondiente, separado por un `_`. P.ej: `#CR-55-API_#CR-62`. Se puede considerar necesario si:
  - la complejidad amerita el desarrollo en una rama separada.
  - no se tiene algo decente para pushear y se lo debe hacer para:
    - compartir el código con otro miembro del equipo
    - guardar las modificaciones para cambiar de dispositivo
    - etc
  
### Desarrollo de la documentación

- El desarrollo de la documentación tendrá como **rama principal** a "*documentación*", y será **mergeada** a *main* sólo en situaciones específicas, cuando eñ equipo de desarrollo haya acordado la necesidad de versionar el estado actual de la documentación.

## Reglas de sintaxis

### Sintaxis para pensajes de commits

Los commits deben referenciar el código de la US o Tarea que estaban implementando, de la siguiente manera: `#ISSUE_KEY <mensaje>`. 
- P.ej: `#CR-25 implemento ruteo de GET avisos retiro`

En el caso de que los commits hayan sido producidos en eventos de Scrum, especificar el nombre del evento de la siguiente manera: `#NOMBRE_EVENTO <mensaje>`, con los códigos de las tareas asociadas.
- P.ej: `#SPRINT-PLANNING Una nueva promesa #T1 #T2 #T3`

Las acciones se hacen para todas las tareas seguidas (o todas las del commit?)
- `3d78425 (HEAD -> CR-40) CR-40 CR-167 #done #time 20m` completó las dos

#### Enlazar commits a issues de Jira
```
<ignored text> <ISSUE_KEY> <ignored text> #<COMMAND> <optional COMMAND_ARGUMENTS>`

E.g: commit -m “#CR-000 esto es un commit #comment soy un comentario”
```

Para un uso avanzado ver la [documentación](https://grupo7metodologias.atlassian.net/plugins/servlet/ac/com.github.integration.production/github-post-install-page)

### Sintaxis para nombramiento de títulos de Tasks

Se hará siguiento el formato: `<Hago> <que> <de que, para que, en que ruta, en que archivo>`.

Ejemplos:
- **Diseñar** tabla "cartonero" *en esquema DB*
- **Crear** tabla "cartonero" *en api/web/db/db.sql*
- **Implementar** servicio API *para agregar un material* 
- **Implementar** modelo de "*GET api/admin/cartoneros*"
- **Crear template** de "*app/admin/materiales-aceptados*"
- **Implementar** interfaz *del listado de materiales aceptados visto por la secretaria*
- **Implementar** interfaz *de "app/admin/registro-ingreso"*

#### Definiciones

> ***Importante***: Las tareas no se pasan a *DONE* hasta que este documentado el test exitoso de los requerimientos

- *Crear tabla*. Agregar el código sql al script de creación de la base de datos (si es necesario con los inserts de inicialización) siguiendo lo específicado por el diagrama (esta tarea está bloqueada por la tarea del diagrama)
- *Crear template*. Hacer el código html usando bootstrap para que se vea como la pantalla de esa **request**
- *Implementar modelo*: Hacer la función del modelo que resuelve el pedido del controlador a partir de los datos en el diagrama de clase
- *Implementar controlador*: Hacer la función del controlador que maneja esa **request** a partir de los datos en el diagrama de clase
- *Implementar interfaz*. Implementar el componente vue que manejará esa **request** (url).
  - P.ej: **Implementar** interfaz de "*app/admin/registro-ingreso*": implementar "*app/pages/RegistroIngreso.js*" con la funcionalidad requerida para: 
    - cargar el formulario de registro de ingreso (el template html/boostrap)
    - enviar el **fetch** adecuado a la API Rest y 
    - manejar la respuesta.
- *Implementar servicio API*: Implementar el servicio API **completo** que incluye:
  - Ruteo de la **request** en api/web/route.php
  - Función del controlador que es ejecutada por el ruteo
  - Función del modelo que es ejecutada por el controlador

### Sintaxis para nombramiento de archivos, clases y funciones

Se hará en CamelCase comenzando por letra mayúscula (minúscula para funciones) y en caso de que se refiera a siglas deberá escribirse en mayúsculas

`E.g: AvisoRetiroModel.php -  class JSONView - function postAvisoRetiro()`

### Sintaxis para nombramiento de tablas y columnas

Se hará en minúscula sustituyendo los espacios por guiones bajos _

`E.g: unc_249456.aviso_retiro -  fecha_emision`

## Testing

Aquél que finalice una tarea la testeará siguiendo [la documentación de testing](./testing.md), y guardará los reports en la carpeta tests dentro de la carpeta de la US correspondiente.

### Sintaxis para nombramiento del archivo de testeo

`CR-XX_test_N` con *XX* = código de la tarea/US correspondiente y *N* = número del test