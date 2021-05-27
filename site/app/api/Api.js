export default class Api {

  static async postAvisoRetiro(a) {
    return (Math.random() > 0.5)
      ? { ok: true, mensaje: 'El aviso de retiro de material ha sido cargado con éxito, un recolector pasará por su casa dentro de los horarios elegidos..' }
      : { ok: false, 
          mensaje: 'Usted vive a más de 6km del centro de recolección, puede acercarse personalmente o vincularse a otros ciudadanos a traves de la cartelera de ofertas de transporte.',
          direccion: true }
  }

  static async getVolumenesMateriales() {
    const URL_JSON_LOCAL = './api/volumenes-materiales.json' // json local
    return fetch(URL_JSON_LOCAL).then(r => r.json())
  }
  static async getFranjasHorarias() {
    const URL_JSON_LOCAL = './api/franjas-horarias.json' // json local
    return fetch(URL_JSON_LOCAL).then(r => r.json())
  }

  static #localApiUrl = function (endpoint) {
    return `http://localhost/tpe_metodologias/site/api/web/${endpoint}`
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
