import Api from '../api/Api.js'

const RegistroIngresoTemplate = `
<bs-spinner v-if="loading"></bs-spinner>
<section v-else class="container-sm mt-4">
  <h1 class="fs-1 text-md-center">Recepción de materiales</h1>
    
  <div class="row">
    <div class="col-md d-none d-md-block"></div>

    <div class="col-md">
      <form v-if="$router.currentRoute.value.fullPath == '/admin/registro-ingreso'"
        v-on:submit.prevent="post" class="p-2 form-control-sm" id="form-ar">
          <div class="form-group mb-2">
            <label for= "selectUsuario">Tipo de usuario</label>
            <select id="selectTipoUsuario" v-model="registro_ingreso.tipo" @change="seleccionarTipo"
              class="form-select form-select-sm" aria-label=".form-control-sm example" id= "selectUsuario">
                <option selected disabled value>-- seleccionar una opcion --</option>
                <option v-for="t of tiposUsuario" :value="t.tipo">{{ t.tipo }}</option>
            </select>
          </div>
          <div v-if="registro_ingreso.tipo == tipoCartonero" class="form-group mb-2">
            <label>Cartonero a cargo</label>
            <select id="selectCartonero" v-model="registro_ingreso.cartonero_id" @change="seleccionarCartonero" 
              class="form-select form-select-sm" aria-label=".form-control-sm example">
                <option selected disabled value>-- seleccionar una opcion --</option>
                <option v-for="cartonero of cartoneros" :value="cartonero.id">{{ cartonero.nombre + " " + cartonero.apellido  }}</option>
            </select>
          </div>
      
          <a @click="ingresarMateriales" id= "btn-addMateriales">
            <div class="card border border-1">
              <div class="card-body">
                <blockquote class="blockquote mb-0 d-flex justify-content-between">
                  <div>
                      <h2 class="h5">Materiales recolectados</h2>
                      <p class="fs-6 text-muted">{{ registro_ingreso.materiales_cargados.length }} materiales cargados</p>
                      <ul>
                        <li v-for="m of registro_ingreso.materiales_cargados"
                          class="fs-6 text-muted"
                        >{{ m.nombre }}. {{ m.peso }}<small>kg</small></li>
                      </ul>
                  </div>
                </blockquote>
              </div>
            </div>
          </a>
              <!--
              <div class="card border border-1">
              <div class="card-body">
                  <blockquote class="blockquote mb-0 d-flex justify-content-between">
                    <div>
                        <h2 class="h5">Domicilios visitados</h2>
                        <p class="fs-6 text-muted">(1/9 visitados)</p>
                    </div>
                  <a  class="d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </a> 
                  </blockquote>
              </div>
              </div>-->
              <bs-alert v-if="error != ''"
                class="my-3"
              >{{ error }}</bs-alert>
              <div class="d-grid gap-2 mt-3">
                <button class="btn btn-primary btn-block w-100 py-2">
                  <bs-spinner v-if="posting"></bs-spinner>
                  <template v-else>Enviar</template>
                </button>
                <btn-cancelar></btn-cancelar>
              </div>
        
              <respuesta-modal v-model="respuesta" r-id="respuesta-registroIngreso"></respuesta-modal>
          </form>
        </div>
  
  <div class="col-md d-none d-md-block"></div>
</div>

  <router-view
    v-model="registro_ingreso.materiales_cargados"
    :info-registro="infoRegistro"
    class="container-sm mt-4" 
  ></router-view>
  <!--<router-view 
    :cartonero="registro_ingreso.cartonero_id"
    :recolectado="recolectadoPor"
    class="container-sm mt-4" 
  ></router-view>-->
    
</section>

`

export default {
  data() {
    return {
      registro_ingreso: {
        "tipo": undefined,
        "cartonero_id": null,
        "materiales_cargados": []
      },
      cartoneros: undefined,
      tiposUsuario: undefined,
      cartoneroSeleccionado: null,
      infoRegistro: {},
      posting: false,
      error: '',
      respuesta: undefined
    }
  },
  computed: {
    recolectadoPor() {
      return this.cartoneroSeleccionado != null ?
        this.cartoneroSeleccionado.nombre :
        this.registro_ingreso.tipo
      // if (this.cartoneroSeleccionado) {
      //   return this.cartonero_id.nombre
      // }
      // else {
      //   return this.registro_ingreso.tipo
      // }
    },
    posteable() {
      if (!this.verificado) {
        this.error = 'Seleccionar el usuario que ingresa los materiales'
        return false
      }
      if (this.registro_ingreso.materiales_cargados.length == 0) {
        this.error = 'Ingresar materiales'
        return false
      }
      
      this.error = ''
      return true
    },
    verificado() {
      // if (this.registro_ingreso.tipo != undefined) {
      //   if (this.registro_ingreso.tipo == this.tipoCartonero) {
      //     return this.cartoneroSeleccionado != null
      //   }
      //   return true
      // }
      // return false
      return this.registro_ingreso.tipo != undefined ? (
          this.registro_ingreso.tipo == this.tipoCartonero ? 
            this.cartoneroSeleccionado != null : 
            true
          ) : false
    },
    loading() {
      return this.cartoneros == undefined || this.tiposUsuario == undefined
    },
    totalKg() {
      return this.registro_ingreso.materiales_cargados.reduce((totPeso, material) => totPeso += material.peso, 0)
    }
  },
  async created() {
    const t = this
    Api.getData('admin/cartoneros', { "getLocal": true }).then(r => t.cartoneros = r.data.cartoneros)
    Api.getData('admin/tipos-usuario', { "getLocal": true }).then(r => {
      t.tiposUsuario = r.data.tiposUsuario
      t.tipoCartonero = r.data.TIPO_CARTONERO
    })
  },
  async mounted() {
    // console.log(this.registro_ingreso)
  },
  methods: {
    async post() {
      if (this.posteable) {
        // console.log(this.registro_ingreso)
        this.posting = true
        const r = await Api.postData('admin/registro-ingreso', this.registro_ingreso)
        this.posting = false
        this.respuesta = r
        if (r.ok) 
          this.resetearRegistro();
        
        // const t = this
        // setTimeout(() => {
        //   t.respuesta = undefined
        // }, 1500)
      }
    },
    resetearRegistro() {
      this.registro_ingreso = {
        "tipo": undefined,
        "cartonero_id": null,
        "materiales_cargados": []
      }
    },
    seleccionarCartonero(e) {
      const select = e.currentTarget
      const id = select.value
      // console.log(select.value, select.options[select.selectedIndex].text)
      this.cartoneroSeleccionado = {
        id,
        nombre: select.options[select.selectedIndex].text
      }
    },
    seleccionarTipo(e) {
      const tipo = e.currentTarget.value
      // console.log(tipo)
      if (tipo != this.tipoCartonero && this.cartoneroSeleccionado !== null) {
        this.cartoneroSeleccionado = null
        this.registro_ingreso.cartonero_id = null
      } 
    },
    ingresarMateriales() {
      if (this.verificado) {
        const t = this
        this.error = ''
        // console.log(this.recolectadoPor, this.registro_ingreso.cartonero_id)
        this.infoRegistro = {
          recolectadoPor: this.recolectadoPor,
          cartoneroId: this.registro_ingreso.cartonero_id
        }
        this.$router.push('/admin/registro-ingreso/materiales')
        
      }
      else {
        this.error = 'Seleccionar todos los campos'
      }
    }
  },
  template: RegistroIngresoTemplate
}