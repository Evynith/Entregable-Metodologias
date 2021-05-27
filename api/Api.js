export default class Api {

  static async postAvisoRetiro(a) {
    // const r = await Api.fetchLocalAPI('aviso_retiro', {
    let r;
    try {
      r = await Api.fetchHerokuAPI('aviso_retiro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(a)
      })
    }
    catch (e) {
      r = {
        ok: false,
        mensaje: 'Error de conexión'
      }
    }
    // console.log(r)
    return r
  }

  static async getMaterialesAceptados() {
    return Api.getData('materiales_aceptados')
}

  static async getVolumenesMateriales() {
    return Api.getData('volumenes_materiales')
  }
  static async getFranjasHorarias() {
    return Api.getData('franjas_horarias')
  }

  static async getData(endpoint) {
    let json;
    try {
      json = await Api.fetchHerokuAPI(endpoint)
    }
    catch (e) {
      console.log(e)
      console.log('#Obteniendo datos de json local...')
      json = await Api.fetchLocalJSON(endpoint)
    }
    return json
  }

  static fetchHerokuAPI(endpoint, options = { }) {
    const url = `https://coop-rec-api.herokuapp.com/${endpoint}`
    return fetch(url, options).then(r => r.json()).catch(e => console.log(e))
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

/*
async function fetchTimeout(url, options = {}) { // https://dmitripavlutin.com/timeout-fetch-request/
  const { timeout = 3000 } = options
  const c = new AbortController()
  const id = setTimeout(() => c.abort(), timeout)
  const response = await fetch(url, {
    ...options,
    signal: c.signal
  })
  clearTimeout(id)
  
  return response
}
*/

