import CartoneroModify from './CartoneroModify.js'

const CartoneroABMTemplate = `

  <template v-if="cartonero != undefined && !deleting">
    <div v-if="! (cartonero.id == null || editar)" class="card" id="cartonero-abm">
      <div class="row card-header">
        <h5 class="col-8" v-html="cartonero.nombre, cartonero.apellido"></h5>

        <div class="d-flex col justify-content-around">
          <!-- botones de modificar  (pantalla gral.) -->
          <a v-if="cartonero.id != null" @click="iniciarEdicion">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-pencil-square"
              viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
          </a>
          <a v-if="cartonero.id != null" @click="eliminar">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-trash-fill"
              viewBox="0 0 16 16">
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </a>
        </div>
          <!--fin botones de modificar  (pantalla gral.) -->

      </div>
      <div class="card-body">
        
        <ul>
          <li class="card-text" v-html="cartonero.nombre"></li>
          <li class="card-text" v-html="cartonero.apellido"></li>
          <li class="card-text" v-html="cartonero.DNI"></li>
          <li class="card-text" v-html="cartonero.direccion"></li>
          <li class="card-text" v-html="cartonero.nacimiento"></li>
          <li class="card-text" v-html="cartonero.vehiculo"></li>
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
  <bs-spinner v-else-if="deleting"></bs-spinner>

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
  props: ['modelValue'],
  methods: {
    informarRespuesta(r) {
      this.$emit('responded', r)
      // this.$emit('update:modelValue', state)
    },
    async eliminar() {
      console.log('# cartoneroABM : eliminando', this.cartonero)
      this.deleting = true
      const r = await Api.deleteCartonero(this.cartonero)
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
        this.cartonero = { ...this.backup }// :v:
        this.$emit('cancelarEdicion')
        this.backup = undefined
      }
    },
    async post() {
      this.posting = true
      const posted = { ...this.cartonero }
      delete posted.id
      const r = await Api.postCartonero(posted, this.editar ? this.cartonero.id : null)
      this.editar = false
      this.posting = false
      this.informarRespuesta(r)
      if (r.ok) {
        this.$emit('updated', (r.id ? r.id : this.cartonero.id))
      }
      else {
        this.error = r.mensaje
        console.log(this.error)
      }
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
  emits: ['update:modelValue', 'updated', 'cancelarCreacion', 'cancelarEdicion', 'responded'],

  template: CartoneroABMTemplate,
  components: {
    'cartonero-modify': CartoneroModify
  }
}