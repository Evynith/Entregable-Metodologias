export default class Api {

    //"conexion" al JSON local
    static async getMaterialesAceptados() {
        return fetch('../app/api/materiales-aceptados.json').then(r => r.json());
    }

    // static async getMaterialesAceptados() {
    //     const URL = ''
    //     return fetch(URL).then(r => r.json())
    // }
}