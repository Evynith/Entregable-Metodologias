import Api from '../api/Api.js'
import InputFile from './InputFile.js'
import MaterialABM from './MaterialABM.js'

const MaterialesAceptadosTemplate = `

<div v-if="loading" class="d-flex justify-content-center">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
<section v-else>

<header class="d-flex justify-content-center align-items-center mt-2 mb-4">  <!-- class="d-flex justify-content-around" --> <!-- cuando aparece botón se le agrega esas clases a header-->
  <h1 class="d-flex justify-content-start fs-1 me-4">Materiales aceptados</h1> 

  <!-- titulo editar (pantalla editar) -->
  <!-- <h1 class="d-flex justify-content-start fs-1 mb-4">Mofificar material</h1>  -->
  <!-- fin titulo editar (pantalla editar) -->

  <!-- boton de agregar (pantalla gral.) -->
   <a @click="addMaterial" > 
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2196F3" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
    </svg>
  </a> 
  <!--fin boton de agregar (pantalla gral.) -->
</header>

  <ul class="nav d-flex justify-content-between mb-3" id="pills-tab" role="tablist">
    <li v-for="(m, i) of materiales" role="presentation" class="my-1" style="width: 32%;">
      <button type="button" role="tab" 
        :class="['card', 'px-0', { 'active': selectedItem && selectedItem.nombre == m.nombre} ]"
        @click="updateSelectedItem(m)"
      >
        <img :src="m.imagen" class="card-img-top">
        <span v-html="m.nombre" class="w-100 text-center py-1 small"></span>
      </button>
    </li>
  </ul>

  <!-- titulo editar (pantalla editar) -->
  <!--<h1 class="fs-1 mb-4">Editar {{material}}</h1>--> 
  <!-- fin titulo editar (pantalla editar) -->

  <!-- titulo editar (pantalla editar) -->
  <!-- <h1 class="fs-1 mb-4">Añadir {{material}}</h1> -->
  <!-- fin titulo editar (pantalla editar) -->




  <!--ANTES <div class="tab-content" id="pills-tabContent"> 
    <div v-for="(m, i) of materiales" 
      :class="['card', 'tab-pane', 'fade', { 'show': i == 0, 'active': i == 0 }]" 
      :id="getTabId(i)" 
      :aria-labelledby="getPillsId(i)" role="tabpanel"
    > -->
    
  <material-abm 
    v-model="selectedItem"
    @updated="resync"
    @cancelar-creacion="materiales.pop()"
    @cancelar-edicion="cancelarEdicion"
  ></material-abm>


  <div id="modal-respuesta" class="modal modal-fullscreen-sm-down" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <template v-if="respuesta">
            <h5 v-if="respuesta.ok == true" class="modal-title">Aviso cargado con éxito</h5>
            <h5 v-else class="modal-title">No se pudo cargar su aviso</h5>
          </template>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p v-if="respuesta" v-html="respuesta.mensaje"></p>
        </div>
        <div class="modal-footer">
          <template v-if="respuesta">
            <template v-if="respuesta.ok == true">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Borrar</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>

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
            console.log(`# No existe el material ${id} : MaterialesAceptadosAdmin`)
          }
        }
        else { // si es delete
          this.selectedItem = undefined
          console.log(`# Material eliminado (o post) : MaterialesAceptadosAdmin`)
        }
      }, 500)
    },
    async getMateriales() {
      this.materiales = await Api.getMaterialesAceptados()
      console.log('pude obtener datos', this.materiales)
    },
    addMaterial() {
      // site\app\images\materiales\no-image.png
      this.selectedItem = {
        "id": null,
        "nombre": "",
        "imagen": "./images/materiales/no-image.png",
        "descripcion": ""
      }
      this.materiales.push(this.selectedItem)
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