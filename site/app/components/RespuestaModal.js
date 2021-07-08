const RespuestaModalTemplate = `
<div :id="rId" class="modal modal-fullscreen-sm-down" role="dialog">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div v-if="respuesta != undefined" class="modal-header">
        <h5 v-if="respuesta.ok" class="modal-title">Operación realizada con éxito</h5>
        <h5 v-else class="modal-title">Error</h5>
        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
      </div>
      <div v-if="respuesta != undefined" class="modal-body">
        <p v-if="respuesta.ok">{{ respuesta.mensaje ? respuesta.mensaje : 'Ok' }}</p>
        <p v-else>{{ respuesta.error ? respuesta.error : 'No se pudo realizar la operación' }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="closeModal">Entendido!</button>
      </div>
    </div>
  </div>
</div>
`

export default {
    template: RespuestaModalTemplate,
    emits: [ 'update:modelValue' ],
    props: [ 'modelValue', 'rId' ],
    computed: {
      respuesta: {
        get() {
            return this.modelValue;
        },
        set(val) {
          this.$emit('update:modelValue', val);
        }
      },
    },
    data() {
      return {
        bsModal: null,
        domModal: null
      } 
    },
    mounted() {
      this.domModal = document.querySelector('#' + this.rId)    
      this.bsModal = new bootstrap.Modal(this.domModal, {}) //
      const t = this
      this.domModal.addEventListener('hidden.bs.modal', function (e) {
        // this.bsModal.dispose()
        // console.log('hidden')
        t.respuesta = undefined
        // t.$emit('disposed')
      })
    },
    methods: {
      closeModal() {
        this.bsModal.hide()
        // document.querySelector('.modal-backdrop').remove()
        // document.body.style = "" // bootstrap pone overflow-hidden y otras cosas
      }
      //data-bs-dismiss="modal"
    },
    // props: {
    //     respuesta: {
    //         type: Object,
    //         default: undefined
    //     }
    // },
    watch: {
        modelValue: async function (v, v1) {
          // if (typeof v === 'object' && v.ok === 'boolean') { // da false
          if (typeof v != 'undefined') {
            // this.respuesta = v
            // this.respuesta = v
            // let modal = document.querySelector('#modal-respuesta') // funciona solo una vez.. habrá un problema con el id?
            // let bs = bootstrap.Modal.getOrCreateInstance(modal) // dic que no existe la funcion
            // let bs = new bootstrap.Modal(modal, {})
            // this.bsModal = new bootstrap.Modal(this.domModal, {}) //
            this.bsModal.show()
            // const t = this
            // modal.addEventListener('hidden.bs.modal', function (e) {
            //   // this.bsModal.dispose()
            //   console.log('hidden')
            //   t.respuesta = undefined
            //   // t.$emit('disposed')
            // })
          }
        }
    }
}