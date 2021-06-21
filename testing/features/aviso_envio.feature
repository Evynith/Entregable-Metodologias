# Feature: Creación de aviso de retiro de material de un ciudadano
# Background: No se ha completado ningún dato personal
#   Como ciudadano
#   Quiero crear un aviso de retiro
#   Para que pasen a buscar mi material reciclable
 
#   Scenario: Ingreso de datos con una dirección válida sin otro dato
#     When Escribo la dirección "Alem 500"
#     Then Recibo una notificación que dice "Faltan ingresar datos"

# Feature: Creación de aviso de retiro de material de un ciudadano
# Background: No se ha completado ningún dato personal
#   Como ciudadano
#   Quiero crear un aviso de retiro
#   Para que pasen a buscar mi material reciclable
 
#   Scenario Outline: Ingreso de datos con una dirección válida sin otro dato
#     When Escribo la dirección <direccion>
#     Then Recibo una notificación que dice <respuesta>
#     Examples: 
#         | direccion | respuesta | 
#         | Alem 500  | Faltan ingresar datos |
#         | Alem 503  | Faltan ingresar datos |

Feature: Creación de aviso de retiro de material de un ciudadano
Background: Se llenan todos los datos escepto la imágen
  Como ciudadano
  Quiero crear un aviso de retiro
  Para que pasen a buscar mi material reciclable
 
  Scenario Outline: Ingreso datos válidos
    When Escribo el nombre <nombre>
    And Escribo el apellido <apellido>
    And Escribo la dirección <direccion>
    And Escribo el telefono <telefono>
    And Selecciono el horario de <horario>
    And Selecciono un volumen de <volumen>
    And envío el formulario
    Then Recibo una notificación que dice <respuesta>

    Examples:
    | nombre | apellido | direccion               | telefono                              | horario  | volumen | respuesta                                                                                                                                                           |
    | Juan   |          | Alem 500                | 2494121212                            | 9 a 12hs | Caja    | Faltan ingresar datos                                                                                                                                               |
    | Juan   | Perez    | Alem 503                | 2494121212                            | 9 a 12hs | Caja    | El aviso de retiro de material ha sido cargado con éxito, un recolector pasará por su casa dentro de los horarios elegidos..                                        |
    | Juan   | Perez    | Paraje Arroyo Seco s/n  | 2494121212                            | 9 a 12hs | Caja    | Usted vive a más de 6km del centro de recolección, puede acercarse personalmente o vincularse a otros ciudadanos a traves de la cartelera de ofertas de transporte. |
    | Juan   | Perez    | Alem 500                | 2494121212999999999999999999999999999 | 9 a 12hs | Caja    | Algo salió mal :(                                                                                                                                                   |
    

