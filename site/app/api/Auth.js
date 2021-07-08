import app from '../app.js'
import Api from './Api.js'

export default class Auth {

    static isLoggedIn() {
        try {
            return Auth.#_getUser() != undefined
        }
        catch (e) {
            return false
        }
    }

    static login(u) {
        console.log('Auth logging in ', u)
        app.login(u)
        app.$router.push('/')
    }

    static async isAdmin() {
        if (!Auth.isLoggedIn()) return false
        app.startLoading()
        const r = await Api.postData('/admin/validar-usuario', Auth.#_getUser())
        app.stopLoading()
        console.log('Auth validando usuario', r)
        return Auth.isLoggedIn() ? 
            r.data :
            false
    }

    static #_getUser() {
        const usuario = app.usuario
        // console.log(JSON.stringify(usuario))
        return usuario
    }
}