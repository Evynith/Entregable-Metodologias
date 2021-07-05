Feature: Recepción de materiales reciclables
  Como secretaria 
  Quiero registrar el material que fue recolectado 
  Para tener un registro de que materiales hay disponibles
 
  Scenario Outline: Ingreso datos válidos, un sólo material
    When Selecciono un tipo de usuario <tipo>
    And Si puedo, selecciono a la persona <cartonero>
    And Cargo los materiales
    And Selecciono el material <material>
    And Cargo el peso <peso>
    And Cargo el material
    And Termino la carga de materiales
    And Envío el formulario de carga
    Then Recibo una alerta que dice <respuesta>

    Examples:
    | tipo | cartonero | material | peso | respuesta |
    | Vecino buena onda |  | Plástico | 33.5 | Registro cargado con éxito |
    | Cartonero | María Martinez | Plástico | 33.5 | Registro cargado con éxito |

