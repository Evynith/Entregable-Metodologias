import Api from '../api/Api.js'

const AvisoRetiroRow = {
  template: `
    <template >

    </template>
    <tr @click="desplegada = !desplegada" :class="[ { 'bg-lg': desplegada } ]">
      <template v-if="!desplegada">
        
        <div class="text-center d-none d-md-block">
          <div class="row">
            <td class="col p-3">
                <div style="border-color: forestgreen">
                  <img class="border rounded border-3" :src="aviso.foto != '' ? aviso.foto : './images/materiales/no-image.png'" alt="" 
                      width=100 height=100>
                </div>
            </td>
            <td class="col p-3">{{ aviso.nombre + aviso.apellido }}</td>
            <td class="col p-3">{{ aviso.telefono }}</td>
          </div>
        </div>
        <td class="p-3 text-center">{{ aviso.direccion }}</td>
        <td class="p-3 text-center">{{ aviso.cod_categoria }}</td>
        <td class="p-3 text-center">{{ aviso.franja_horaria }}</td>
      </template>
      <template v-else>
        <td colspan="3" class="py-2 px-2">
          <div class="d-flex justify-content-between pe-4 ps-1 my-2">
            <p class="fs-5 fw-bold mb-0">{{ aviso.direccion }}</p>
            <p class="fs-6 fw-light mb-0">{{ aviso.cod_categoria }}</p>
            <p class="fs-6 fw-light mb-0">{{ aviso.franja_horaria }}</p>
          </div>
          <div class="d-flex justify-content-around align-items-center">
            <div class="border rounded border-3" style="border-color: forestgreen">
              <img :src="aviso.foto != '' ? aviso.foto : './images/materiales/no-image.png'" alt="" 
                  width=100 height=100>
            </div>
            <div class="d-flex flex-column container-sm mx-3 my-2">
              <div class="d-flex justify-content-between">
                <div>
                  <small class="fw-bold" style="font-size: 13px">Fecha</small>
                  <p class="fw-light mb-0">{{new Date(aviso.fecha_emision).toLocaleDateString()}}</p>
                </div>
                <div>
                  <small class="fw-bold" style="font-size: 13px">Telefono</small>
                  <p class="fw-light mb-0">{{aviso.telefono}}</p>
                </div>
              </div>
              <small class="fw-bold" style="font-size: 13px">Nombre y Apellido</small>
              <p class="fw-light mb-0">{{aviso.nombre + aviso.apellido}}</p>
            </div>
          </div>
          <div class="row align-bottom">
          <div class="col">
          </div>
        </td>
      </template>
    </tr>
    <tr  :class="[ { 'bg-lg': desplegada } ]">
    </tr>
  `,
  props: [ 'aviso' ],
  data() {
    return {
      desplegada: false
    }
  }
}

const AvisosRetiroTemplate = `
<div v-if="loading" class="d-flex justify-content-center">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
<section v-else>
  <h1 class="fs-1">Avisos de retiro</h1>
  <p class="text-muted mb-0"> ({{ avisosRetiro.length }} avisos) </p>
  <table class="table table-striped border border-3">
    <caption class= "h-6 lh-1">
      * Las categorías del volumen de materiales se rigen de menor a mayor siendo: <br> 
        A. entra en una caja <br>
        B. entra en el baúl de un auto <br> 
        C. entra en la caja de una camioneta <br> 
        D. es necesario un camión.
    </caption>
    <thead class="ml-2" style="background-color: forestgreen;">
      <div class="text-center d-none d-md-block">
          <div class="row pt-3">
          <td class="col fw-bold text-white d-none d-md-block">Foto</td>
          <td class="col fw-bold text-white d-none d-md-block">Nombre</td>
          <td class="col fw-bold text-white d-none d-md-block">Teléfono</td>
        </div>
      </div>
      <td class="p-3 fw-bold text-white text-center" @click="ordenarPor('direccion')">Domicilio</td>
      <td class="p-3 fw-bold text-white text-center" @click="ordenarPor('volumen')">Volumen</td>
      <td class="p-3 fw-bold text-white text-center" @click="ordenarPor('franja_horaria')">Horario</td>
    </thead>

    <tbody>
      <aviso-retiro-row v-for="aviso of avisosRetiro" :aviso="aviso">
      </aviso-retiro-row>
  </table>
  
</section>
`

export default {
    data() {
        return {
            avisosRetiro: undefined,
            orderDir: false
        }
    },
    computed: {
      loading() {
        return this.avisosRetiro == undefined
      }
    },
    async created() {
        this.avisosRetiro = await Api.getAvisosRetiro()
        // console.log('pude obtener datos', this.materiales)
    },
    methods: {
      ordenarPor(propiedad) {
        this.orderDir = !this.orderDir
        const signo = this.orderDir // true creciente, false decreciente
        this.avisosRetiro = this.avisosRetiro.sort(function (a, b) {
          const a1 = a[propiedad]
          const b1 = b[propiedad]
          if (signo) {
            return a1 > b1 ? 1 : (a1 == b1 ? 0 : -1)
          }
          else {
            return a1 < b1 ? 1 : (a1 == b1 ? 0 : -1)
          }
        })
      }
    },
    components: {
      'aviso-retiro-row': AvisoRetiroRow
    },
    template: AvisosRetiroTemplate
}