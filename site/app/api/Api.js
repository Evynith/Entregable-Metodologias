export default class Api {

  static async deleteMaterial(m) {
    let r
    try {
       r = await Api.delete('admin/material-aceptado/' + m.id)
    }
    catch (e) {
      r = {
        ok: false,
        mensaje: 'Error de conexión'
      }
    }
    return r
  }

  static async delete(endpoint) {
    let options = {
      method: 'DELETE'
    }
    // return {
      //   "ok": true
      // }
    let r;
    console.log('# Api : borrando ', endpoint)
    try {
      r = await Api.fetchLocalAPI(endpoint, options)
      // console.log(url)
      // r = { "ok": true, "id": m.id }
    }
    catch (e2) {
      console.log(e2)
      r = {
        ok: false,
        mensaje: 'Error de conexión'
      }
    }
    return r
  }

  static async postMaterial(m, id = null) {
    let r;
    const method = id == null ? 'POST' : 'PUT'
    let options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(m)
    }
    let url = 'admin/material-aceptado'
    if (id != null) {
      url += '/' + id
    }
    // try {
    //   r = await Api.fetchHerokuAPI(url, options)
    // }
    // catch (e) {
      console.log('# Api : Posteando datos a API local...', url, m)
      try {
        r = await Api.fetchLocalAPI(url, options)
        // console.log(url)
        // r = { "ok": true, "id": m.id }
      }
      catch (e2) {
        console.log(e2)
        r = {
          ok: false,
          mensaje: 'Error de conexión'
        }
      }
    // }
    // console.log(r)
    return r
  }
  

  static async postAvisoRetiro(a) {
    // const r = await Api.fetchLocalAPI('aviso_retiro', {
    let r;
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(a)
    }
    try {
      r = await Api.fetchHerokuAPI('aviso_retiro', options)
    }
    catch (e) {
      console.log(e, '#Posteando datos a API local...')
      try {
        r = await Api.fetchLocalAPI('aviso_retiro', options)
      }
      catch (e2) {
        r = {
          ok: false,
          mensaje: 'Error de conexión'
        }
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
  static async getAvisosRetiro() {
    return Api.getData('admin/avisos-retiro');
  }

  static async getData(endpoint) {
    let json;
    // try {
    //   json = await Api.fetchHerokuAPI(endpoint)
    // }
    // catch (e) {
      try {
        console.log('#Obteniendo datos de API local...')
        json = await Api.fetchLocalAPI(endpoint)
      }
      catch (e2) {
        console.log('#Obteniendo datos de json local...')
        json = await Api.fetchLocalJSON(endpoint)
      }
    // }
    return json
  }

  static fetchHerokuAPI(endpoint, options = { }) {
    const url = `https://coop-rec-api.herokuapp.com/${endpoint}`
    return fetch(url, options).then(r => r.json())
  }

  static fetchLocalAPI(endpoint, options = {}) {
    const url = `http://localhost/tpe_metodologias/site/api/web/${endpoint}`
    return fetch(url, options).then(r => r.json())
  }

  static fetchLocalJSON(endpoint) {
    const url = `./api/${endpoint}.json`
    // console.log(url)
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

