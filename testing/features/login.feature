Feature: Recepción de materiales reciclables
  Como secretaria 
  Quiero ingresar a la pagina 
  Para ver los sitios solo disponibles para mí
 
  Scenario Outline: Ingreso datos
    When Cargo el usuario <usuario>
    And Cargo la contraseña <contrasenia>
    Then Recibo una alerta en login que dice <respuesta>

    Examples:
    | usuario | contrasenia  | respuesta                 |
    | admin   | admin        |                           |
    | noAdmin | noContrasenia| Error de conexión         |
    | admin   | adminNoContra| La contraseña no coincide |
