import Api from '../api/Api.js'
import CartoneroModify from './CartoneroModify.js'

const CartoneroABMTemplate = `

  <template v-if="cartonero != undefined && !deleting">
    
    <div v-if="! (cartonero.id == null || editar)" class="card" id="cartonero-abm">
      <div class="card-header ">
        <div class="row">
          <h5 class="col-8" v-html="cartonero.apellido + ', ' + cartonero.nombre"></h5>
  
          <div class="col gap-2 d-flex flex-row-reverse justify-content-start">
            <!-- botones de modificar  (pantalla gral.) -->
            <a class="ms-md-1" v-if="cartonero.id != null" @click="eliminar">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-trash-fill"
                viewBox="0 0 16 16">
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </a>
            <a v-if="cartonero.id != null" @click="iniciarEdicion">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-pencil-square"
                viewBox="0 0 16 16">
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </a>
          </div>
            <!--fin botones de modificar  (pantalla gral.) -->

        </div>

      </div>
      <div class="card-body">
        
        <ul style="list-style: none;" class="ps-1">
          <!-- <li class="card-text" v-html="cartonero.nombre"></li>
          <li class="card-text" v-html="cartonero.apellido"></li> -->
          <li class="d-flex my-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-credit-card-2-front" viewBox="0 0 16 16">
              <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
              <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <label class="fw-bold mx-2">DNI:</label>
            <p class="card-text" v-html="cartonero.dni"></p>
          </li>
          <li class="d-flex my-3"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
              <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg> 
            <label class="fw-bold mx-2">Dirección:</label>
            <p class="card-text" v-html="cartonero.direccion"></p>
          </li>
          <li class="d-flex my-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
              <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
              <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <label class="fw-bold mx-2">Fecha de nacimiento:</label>
            <p class="card-text" v-html="cartonero.fecha_nacimiento"></p>
          </li>
          <li class="d-flex my-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
            <label class="fw-bold mx-2">Volumen:</label>
            <p class="card-text" v-html="cartonero.vehiculo_volumen"></p>
          </li>
        </ul>

      </div>
    </div>
    <cartonero-modify v-else
      v-model="cartonero"
      @cancelar="cancelarPost"
      @guardar="post"
      :posting="posting"
    ></cartonero-modify>

  </template>
  <bs-spinner v-else-if="deleting || actualizando"></bs-spinner>

`


export default {
  data() {
    return {
      state: 'mostrar',
      editar: false,
      backup: undefined,
      posting: false,
      deleting: false
    }
  },
  props: ['modelValue', 'actualizando'],
  methods: {
    informarRespuesta(r) {
      this.$emit('responded', r)
      // this.$emit('update:modelValue', state)
    },
    async eliminar() {
      console.log('# cartoneroABM : eliminando', this.cartonero)
      this.deleting = true
      const r = await Api.deleteCartonero(this.cartonero.id)
      this.informarRespuesta(r)
      this.deleting = false
      console.log('# Eliminado cartonero : CartoneroABM', r)
      this.$emit('updated')
    },
    iniciarEdicion() {
      this.editar = true
      this.backup = { ...this.cartonero }
    },
    cancelarPost() {
      if (this.cartonero.id == null) {
        // console.log('# CartoneroABM >> Cancelar creacion')
        this.$emit('cancelarCreacion')
      }
      else {
        this.editar = false
        // console.log('# CartoneroABM : Cancelar edicion')
        // console.log(this.cartonero)
        this.cartonero = { ...this.backup }
        this.$emit('cancelarEdicion')
        this.backup = undefined
      }
    },
    async post(cartonero) {
      this.posting = true

      const posted = { ...cartonero }
      delete posted.id
      // console.log('#CartoneroABM.js - posteando', posted)
      const r = await Api.postCartonero(posted, this.editar ? this.cartonero.id : null)
      this.editar = false
      this.posting = false
      this.informarRespuesta(r)
      // console.log(JSON.parse(JSON.stringify(this.cartonero)))
      if (r.ok) {
        // console.log('#CartoneroABM - emitting ', r.data.id)
        this.$emit('updated', r.data.id)
      }
      // else {
      //   this.error = r.mensaje
      //   console.log(this.error)
      // }
    }
  },
  computed: {
    cartonero: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  },
  watch: {
    modelValue: {
      handler: function (val, oldVal) { // aca si funciona, _val_ es la propiedad de Modify desestructurada, _oldVal_ la que tenia guardada aca
        console.log('#CartneroABM - updated modelValue desde', oldVal, ' a ', val)
        
      },
      deep: true
    }
  },
  emits: ['update:modelValue', 'updated', 'cancelarCreacion', 'cancelarEdicion', 'responded'],

  template: CartoneroABMTemplate,
  components: {
    'cartonero-modify': CartoneroModify
  }
}