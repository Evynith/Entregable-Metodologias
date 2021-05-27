export default class Api {

    static async getMaterialesAceptados() {
        return Api.getData('materiales_aceptados')
    }

    static async getData(endpoint) {
        const r_local_api = await Api.fetchLocalAPI(endpoint)
        let json = r_local_api.ok ? r_local_api : await Api.fetchLocalJSON(endpoint)
        return json
    }

    static fetchLocalAPI(endpoint, options = {}) {
        const url = `http://localhost/tpe_metodologias/site/api/web/${endpoint}`
        return fetch(url, options).then(r => r.json())
    }

    static fetchLocalJSON(endpoint) {
        const url = `./api/${endpoint}.json`
        return fetch(url).then(r => r.json())
    }
}