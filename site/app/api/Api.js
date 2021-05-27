export default class Api {

  static async postAvisoRetiro(a) {
    const r = await Api.fetchLocalAPI('aviso_retiro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(a)
    })
    // console.log(r)
    return r
    // return (Math.random() > 0.5)
    //   ? { ok: true, mensaje: 'El aviso de retiro de material ha sido cargado con éxito, un recolector pasará por su casa dentro de los horarios elegidos..' }
    //   : { ok: false, 
    //       mensaje: 'Usted vive a más de 6km del centro de recolección, puede acercarse personalmente o vincularse a otros ciudadanos a traves de la cartelera de ofertas de transporte.',
    //       direccion: true }
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

