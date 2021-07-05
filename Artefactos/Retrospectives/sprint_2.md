# Retrospective Sprint 2

**Asistencia**: Todos los integrantes (asíncrona). 

## Qué anduvo bien:
- Pudimos completar las US que nos correspondian al sprint (y las tareas pendientes)
- Buena comunicación. 
- Tareas bien refinadas (había demasiadas pero sirvieron a su propósito (entender lo que habia que desarrollar)
- Trabajando en varias ramas llegamos a mergear a main sin problemas.
- Haber hecho el diagrama de la DB antes de empezar a desarrollar
- Dividir las tareas en "funciones más específicas", como por ejemplo separar la implementacion del estilo y el template (usando bootstrap y HTML) de la implementacion de Vue, siendo que ambos son del front-end

## Qué anduvo mal:
- Empezamos antes que el sprint 1, pero igual hubo poco tiempo (esperamos a después del parcial)
- Testing para mejorar:
  - Había tareas, muy especifias, sin criterios definidos para testear (implementar footer/ruteo)
  - No todos los test los hizo un integrante ajeno a la tarea realizada (por falta de tiempo muchos los testeamos los mismos que implementamos)
- Haber hecho los diagramas de los servicios de la api mientras se estaba implementando. Si los habiamos antes iba a quedar mas claro

## Nos proponemos a:
- Aplicar con mas disciplina la cascada:
  1. Captura de requerimientos:
    - Identificar US en Jira
    - Especificar lo que haga falta
    - Consultarle más caracteristicas/criterios al P.O para que queden lo mas completas posible
  2. Análisis:
    - Revisión de funcionalidades terminadas y no terminadas para establecer una mejoría
    - Dividir las US en tasks
    - Decidir que tecnologías extra se deben aplicar en el sprint, si es el caso
  3. Diseño:
    - Actualizar el diagrama de clase (nuevas clases y métodos)
    - Hacer los diagramas de los nuevos servicios
  3. Implementar (empezar a mas tardar el 28):
    - Testear las tareas mientras se van terminando (ver como avisar que se hizo algo para que otro lo testee, ej. tener un canal con las tareas que hay que testear y se van borrando)
  4. Testing:
    - Reformular los criterios (a partir de como estamos testeando la api con postman, usando markdown en vez de word, ..)
    - Se testearán de manera automática sólo las funcionalidades que requieran más esfuerzo (por ejemplo formularios)
- Definir encuentros semanales (mínimo) para organizarnos mejor y mantenernos al tanto del estado del proyecto
