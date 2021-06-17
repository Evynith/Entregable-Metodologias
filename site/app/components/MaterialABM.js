import Api from '../api/Api.js'
import InputFile from './InputFile.js'
import MaterialModify from './MaterialModify.js'


const MaterialABMTemplate = `
<template v-if="material != undefined">
  <div v-if="! (material.id == null || editar)" class="card" id="material-abm">
    <div class="row card-header">
      <h5 class="col-8" v-html="material.nombre"></h5>

      <div class="d-flex col justify-content-around">
        <!-- botones de modificar  (pantalla gral.) -->
        <a v-if="material.id != null" @click="iniciarEdicion">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-pencil-square"
            viewBox="0 0 16 16">
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
        </a>
        <a v-if="material.id != null" @click="eliminar">
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
      <p class="card-text" v-html="material.descripcion"></p>
    </div>
  </div>
  <material-modify v-else
    v-model="material"
    @cancelar="cancelarPost"
    @guardar="post"
  ></material-modify>

</template>
`


export default {
  data() {
    return {
      state: 'mostrar',
      editar: false,
      backup: undefined
    }
  },
  props: ['modelValue'],
  methods: {
    updateState(state) {
      this.state = state;
      // this.$emit('update:modelValue', state)
    },
    async eliminar() {
      console.log('# MaterialABM : eliminando', this.material)
      const r = await Api.deleteMaterial(this.material)
      console.log('# Eliminado material : MaterialABM', r)
      this.$emit('updated')
    },
    iniciarEdicion() {
      this.editar = true
      this.backup = { ...this.material }
    },
    cancelarPost() {
      if (this.material.id == null) {
        // console.log('# MaterialABM >> Cancelar creacion')
        this.$emit('cancelarCreacion')
      }
      else {
        this.editar = false
        // console.log('# MaterialABM : Cancelar edicion')
        // console.log(this.material)
        this.material = { ...this.backup }// :v:
        this.$emit('cancelarEdicion')
        this.backup = undefined
      }
    },
    async post() {
      const posted = { ...this.material }
      delete posted.id
      const r = await Api.postMaterial(posted, this.editar ? this.material.id : null)
      if (r.ok) {
        this.$emit('updated', (r.id ? r.id : this.material.id))
      }
      else {
        this.error = r.mensaje
        console.log(this.error)
      }
    }
  },
  computed: {
    material: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  },
  emits: ['update:modelValue', 'updated', 'cancelarCreacion', 'cancelarEdicion'],

  template: MaterialABMTemplate,
  components: {
    'input-file': InputFile,
    'material-modify': MaterialModify
  }
}