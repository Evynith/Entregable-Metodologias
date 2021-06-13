Feature: Creación de aviso de retiro de material de un ciudadano
Background: No se ha completado ningún dato personal
  Como ciudadano
  Quiero crear un aviso de retiro
  Para que pasen a buscar mi material reciclable
 
  Scenario: Ingreso de datos con una dirección válida sin otro dato
    When Escribo la dirección "Alem 500"
    Then Recibo una notificación de falta de datos