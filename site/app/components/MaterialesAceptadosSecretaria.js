import Api from '../api/Api.js'
import InputFile from './InputFile.js'

const MaterialesAceptadosSecretariaTemplate = `

<div v-if="loading" class="d-flex justify-content-center">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
<section v-else>

<header>  <!-- class="d-flex justify-content-around" --> <!-- cuando aparece botón se le agrega esas clases a header-->
  <h1 class="d-flex justify-content-start fs-1 mb-4">Materiales aceptados</h1> 

  <!-- titulo editar (pantalla editar) -->
  <!-- <h1 class="d-flex justify-content-start fs-1 mb-4">Mofificar material</h1>  -->
  <!-- fin titulo editar (pantalla editar) -->

  <!-- boton de agregar (pantalla gral.) -->
  <!-- <a> 
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#2196F3" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
    </svg>
  </a> -->
  <!--fin boton de agregar (pantalla gral.) -->
</header>

  <ul class="nav d-flex justify-content-between mb-3" id="pills-tab" role="tablist">
    <li v-for="(m, i) of materiales" role="presentation" class="my-1" style="width: 32%;">
      <button type="button" role="tab" data-bs-toggle="pill"
        :id="getPillsId(i)"
        :class="['card', 'px-0', { 'active': i == 0} ]"
        :data-bs-target="getTabTarget(i)" 
        :aria-controls="getTabId(i)"
        @click="scrollToTabContent"
      >
        <img :src="m.imagen" class="card-img-top">
        <span v-html="m.nombre" class="w-100 text-center py-1 small"></span>
      </button>
    </li>
  </ul>

  <!-- titulo editar (pantalla editar) -->
  <!-- <h1 class="fs-1 mb-4">Editar {{material}}</h1> -->
  <!-- fin titulo editar (pantalla editar) -->

  <!-- titulo editar (pantalla editar) -->
  <!-- <h1 class="fs-1 mb-4">Añadir {{material}}</h1> -->
  <!-- fin titulo editar (pantalla editar) -->

  <div class="tab-content" id="pills-tabContent"> 
    <div v-for="(m, i) of materiales" 
      :class="['card', 'tab-pane', 'fade', { 'show': i == 0, 'active': i == 0 }]" 
      :id="getTabId(i)" 
      :aria-labelledby="getPillsId(i)" role="tabpanel"
    > 

      <!-- formulario editar (pantalla editar) -->
    <!-- <form v-on:submit.prevent="post" class="p-2 form-control-sm" id="form-ar2">
      <div class="form-group mb-2">
        <label>Titulo</label>
        <input v-model.lazy="ar2.nombre" type="text" class="form-control form-control-sm">
      </div>
      <div class="form-group mb-2">
        <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
        <textarea v-model.lazy="ar2.texto" class="form-control" rows="3"></textarea>
      </div>
      <div class="form-group mb-3">
        <label for="formFile">Cargar nueva imagen del material</label>
        <input-file v-model="ar2.foto" type="img" accept="image/*"></input-file>
      </div>

      <div class="d-grid gap-2">
        <button :disabled="!verificado || posting" class="btn btn-primary btn-block w-100 py-2 text-uppercase">
          <template v-if="!posting">Guardar</template>
          <div v-else class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
        <button @click.prevent="$router.go(-1)" class="btn btn-link btn-block w-100 py-2 text-uppercase">Cancelar</button>
      </div>
    </form> -->
 <!-- fin formulario editar (pantalla editar) -->

    <div class="row card-header">
      <h5 class="col-8" v-html="m.nombre"></h5> 
      <div class="d-flex col justify-content-between">

        <!-- botones de modificar  (pantalla gral.) -->
          <!-- <a>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </a>
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg>
        </a> -->
       <!--fin botones de modificar  (pantalla gral.) -->

      </div>
    </div>

      <div class="card-body">
        <p class="card-text" v-html="m.descripcion"></p>
      </div>
    </div>
  </div>

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
            ar2: {
              nombre: '',
              texto: '',
              foto: ''
            }
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
        this.materiales = await Api.getMaterialesAceptados()
        // console.log('pude obtener datos', this.materiales)
    },
    methods: {
        getTabId(i)     { return `pills-${i}` },
        getTabTarget(i) { return `#${this.getTabId(i)}` },
        getPillsId(i)   { return `pills-${i}-tab` },

        scrollToTabContent() {
            document.querySelector('#pills-tabContent').scrollIntoView({
                behavior: 'smooth'
            })
        }
    },
    template: MaterialesAceptadosSecretariaTemplate,
    components: {
      'input-file': InputFile
    }
}