# Test Template

<table style= "width: 100%">
  <tr>
    <th> Proyect Name </th>
    <td> Cooperativa-reciclaje</td>
    <th> Test Case ID </th>
    <td> #CR-188/1 </td>
  </tr>
  <tr>
    <th> Version </th>
    <td> MPV </td>
    <th> Iteration No. </th>
    <td> 3 </td>
  </tr>
   <tr>
    <th> Tested By </th>
    <td> Evelyn Vega </td>
    <th> Browser </th>
    <td> Brave </td>
  </tr>
  <tr>
    <th colspan="1"> Tested On </th> 
    <td colspan="3"> #CR-188 "Implementar restricciones de logueo para las páginas de la secretaria"</td>
  </tr>
   <tr>
    <th colspan="1"> Description </th>
    <td colspan="3"> Criterios de aceptación:
        <li> Las secciones (ABM (materiales aceptados, cartoneros), ingreso de materiales,  avisos de retiro) solo serán visibles para mi
    </td>
  </tr>
   <tr>
    <th colspan="1"> Made By </th>
    <td colspan="3"> Federico Franchini </td>
  </tr>
</table>

<br>

|Test # | Date | Action | Expected Results | Actual Results | Pass :question: |
| ---   | ---  | ---    | ---              |   ---          | ---   |
| 1 | 08/07 | ver | si no estoy logueado no debo ver el link de acceso a la seccion de login de la pagina, ni debo ver las secciones de (ABM (materiales aceptados, cartoneros), ingreso de materiales,  avisos de retiro) | no veo el acceso directo en ningún lado, no puedo acceder a las paginas restringuidas si no tengo usuario (localhost) | si|
| 2 | 08/07 | ver | si estoy logueado debo ver el link de acceso a la seccion de login de la pagina, ni debo ver las secciones de (ABM (materiales aceptados, cartoneros), ingreso de materiales,  avisos de retiro) | en el nav tengo el acceso directo, puedo acceder a las paginas restringuidas mientras estoy logueado (localhost) | si|