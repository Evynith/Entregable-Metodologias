import Api from '../api/Api.js'
import InputFile from './InputFile.js'

const AvisoRetiroTemplate = `
<div v-if="loading" class="d-flex justify-content-center">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
<section v-else>
  <h1 class="fs-1 text-center"> Crear aviso de retiro de materiales</h1>

  <form v-on:submit.prevent="post" class="p-2 form-control-sm" id="form-ar">
    <div class="form-group mb-2">
      <label>Nombre *</label>
      <input v-model.lazy="ar.nombre" type="text" class="form-control form-control-sm">
    </div>
    <div class="form-group mb-2">
      <label>Apellido *</label>
      <input v-model.lazy="ar.apellido" type="text" class="form-control form-control-sm">
    </div>
    <div class="form-group mb-2">
      <label>Direccion *</label>
      <input v-model="ar.direccion" type="text" class="form-control form-control-sm">
    </div>
    <div class="form-group mb-2">
      <label>Telefono *</label>
      <input v-model="ar.telefono" type="text" class="form-control form-control-sm">
    </div>
    <div class="form-group mb-2">
      <label for= "selectHorario">Franja horaria *</label>
      <select v-model="ar.id_horario" class="form-select form-select-sm" aria-label=".form-control-sm example" id= "selectHorario">
        <option v-for="f of franjasHorarias"
          :value="f.id"
        >{{ f.nombre }}</option>
      </select>
    </div>
    <div class="form-group mb-2">
      <label for= "selectVolumen">Volumen de los materiales (entran en ...) *</label>
      <select v-model="ar.id_volumen" class="form-select form-select-sm" aria-label=".form-control-sm example" id= "selectVolumen">
        <option v-for="m of volumenesMateriales"
          :value="m.id"
        >{{ m.categoria }}</option>
      </select>
    </div>
    <div class="form-group mb-3">
      <label for="formFile">Cargar imagen de los materiales <small>(opcional)</small></label>
      <input-file v-model="ar.foto" type="img" accept="image/*"></input-file>
    </div>
    
    <div class="d-grid gap-2">
      <button :disabled="!verificado || posting" class="btn btn-primary btn-block w-100 py-2 text-uppercase">
        <template v-if="!posting">Enviar</template>
        <div v-else class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
      <button @click.prevent="$router.go(-1)" class="btn btn-link btn-block w-100 py-2 text-uppercase">Cancelar</button>
    </div>
    <p v-if="mensajeError != ''" class="alert alert-danger mt-4">{{ mensajeError }}</p>
  </form>

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
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Eliminar aviso</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
            </template>
            <template v-else-if="respuesta.direccion">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Visitar cartelera</button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</section>`

export default {
    data() {
        return {
            ar: {
                nombre: '',
                apellido: '',
                direccion: '',
                telefono: '',
                id_horario: '',
                id_volumen: '',
                foto: ''
            },
            volumenesMateriales: undefined,
            franjasHorarias: undefined,
            posting: false,
            mensajeError: '',
            respuesta: undefined
        }
    },
    computed: {
      verificado() {
        return true
      },
      loading() {
        return this.volumenesMateriales == undefined || this.franjasHorarias == undefined
      }
    },
    async mounted() {
        const t = this
        Api.getFranjasHorarias().then(f => t.franjasHorarias = f)
        Api.getVolumenesMateriales().then(m => t.volumenesMateriales = m)
        
        // listener al modal que resetea el form
        // document.querySelector('#modal-respuesta').addEventListener('hidden.bs.modal', function () {
        //     document.querySelector('#form-ar').reset()
        // })
    },
    methods: {
        async post() {
          console.log('# Post: ', JSON.stringify(this.ar))
          this.posting = true
          const r = await Api.postAvisoRetiro(this.ar)
          this.respuesta = r 
          this.posting = false
          new bootstrap.Modal(document.querySelector('#modal-respuesta'), { // launch modal
                  keyboard: false
              }).show()
        }
    },
    template: AvisoRetiroTemplate,
    components: {
      'input-file': InputFile
    }
}