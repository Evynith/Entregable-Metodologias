import Api from '../api/Api.js'
import InputFile from './InputFile.js'
import MaterialABM from './MaterialABM.js'

const MaterialesAceptadosTemplate = `

<section>

  <header class="d-flex align-items-center mt-2 mb-4">  <!-- class="d-flex justify-content-around" --> <!-- cuando aparece botón se le agrega esas clases a header-->
    <h1 class="d-flex justify-content-start fs-1 me-4">Materiales aceptados</h1> 

    <!-- boton de agregar (pantalla gral.) -->
    <a @click="addMaterial" > 
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2196F3" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
      </svg>
    </a> 
    <!--fin boton de agregar (pantalla gral.) -->
  </header>

  <bs-spinner v-if="loading"></bs-spinner>
  <div v-else class="row">
  
    <div class="col-md-4 elementos-material">

      <ul class="nav row row-cols-3 row-cols-md-2 me-2 ms-2" id="pills-tab" role="tablist">
        <li v-for="(m, i) of materiales" role="presentation" class="my-1 ps-1 pe-1">
          <button type="button" role="tab" 
            :class="['card', 'px-0', { 'active': selectedItem && selectedItem.nombre == m.nombre} ]"
            @click="updateSelectedItem(m)"
          >
            <img :src="m.imagen" class="card-img-top">
            <span v-html="m.nombre" class="w-100 text-center py-1 small"></span>
          </button>
        </li>
      </ul>

      <!--
      <div v-if="respuesta != undefined" 
        :class="['alert', 'mt-4', { 'alert-danger': ! respuesta.ok, 'alert-success': respuesta.ok }]" role="alert"
      >
        {{ mensajeRespuesta }}
      </div>-->

    </div>

    <div class="col-md-8">
      <material-abm 
        v-model="selectedItem"
        @updated="resync"
        @cancelar-creacion="materiales.shift()"
        @cancelar-edicion="cancelarEdicion"
        @responded="manejarRespuesta"
        ></material-abm>
    </div>

    </div>
    
    <respuesta-modal v-model="respuesta" r-id="respuesta-abmMaterial"></respuesta-modal>
</section>
`

export default {
  data() {
    return {
      materiales: undefined,
      posting: false,
      selectedItem: undefined,
      state: '',
      respuesta: undefined
      // ar2: {
      //   nombre: '',
      //   texto: '',
      //   foto: ''
      // }
    }
  },
  computed: {
    // mensajeRespuesta() {
    //   if (this.respuesta != undefined) {
    //     if (this.respuesta.mensaje != undefined || ! this.respuesta.ok) {
    //       return this.respuesta.mensaje
    //     }
    //     else {
    //       return `Operación realizada con éxito`
    //     }
    //   }
    // },
    verificado() {
      return true
    },
    loading() {
      return this.materiales == undefined
    }
  },
  async mounted() {
    // console.log(MostrarMaterial, ModificarMaterial)
    this.getMateriales()
  },
  methods: {
    manejarRespuesta(r) {
      this.respuesta = r
      // const t = this
      // setTimeout(() => {
      //   t.respuesta = undefined
      // }, 5000)
    },
    cancelarEdicion() {
      this.materiales[this.materiales.findIndex((m)=>m.id == this.selectedItem.id)] = this.selectedItem
    },
    async resync(id = null) {
      this.materiales = undefined
      const t = this
      setTimeout(async () => {
        await t.getMateriales()
        if (id != null) { // si es put o delete
          let index = t.materiales.findIndex((m)=>m.id == id)
          if (index != -1) { // si no fue borrado
            this.selectedItem = this.materiales[index]
          }
          else {
            // console.log(`#MaterialesAceptadosAdmin.js - No existe el material ${id}`)
          }
        }
        else { // si es delete
          this.selectedItem = undefined
          // console.log(`#MaterialesAceptadosAdmin.js : Material eliminado (o post)`)
        }
      }, 500)
    },
    async getMateriales() {

        this.materiales = await Api.getMaterialesAceptados()
        // if (this.materiales.ok != undefined) {
        //   console.log('# error get Materiales : MaterialesAceptadosAdmin ', this.materiales.mensaje)
        //   this.materiales = []
        //   setTimeout(this.getMateriales, 1000)
        // }
        // console.log('pude obtener datos', this.materiales)
      
    },
    addMaterial() {
      // site\app\images\materiales\no-image.png
      this.selectedItem = {
        "id": null,
        "nombre": "",
        "imagen": "./images/materiales/no-image.png",
        "descripcion": ""
      }
      this.materiales.unshift(this.selectedItem)
    },
    updateSelectedItem: function updateSelectedItem(material) {
      this.selectedItem = material;
    }
  },
  template: MaterialesAceptadosTemplate,
  components: {
    'input-file': InputFile,
    'material-abm': MaterialABM
  }
}