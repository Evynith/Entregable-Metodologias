import Api from '../api/Api.js'
import InputFile from './InputFile.js'

const AgregarMaterialTemplate = `

<div>
  <form v-on:submit.prevent="generateMaterial" class="p-2 form-control-sm" id="form-material">
    <div class="form-group mb-2">
      <label>Titulo</label>
      <input v-model.lazy="nombreMaterial" type="text" class="form-control form-control-sm">
    </div>
    <div class="form-group mb-2">
      <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
      <textarea v-model.lazy="descripcion" class="form-control" rows="3"></textarea>
    </div>
    <div class="form-group mb-3">
      <label for="formFile">Cargar nueva imagen del material</label>
      <input-file v-model="imagenMaterial" type="img" accept="image/*"></input-file>
    </div>



    <button :disabled="!verificado || posting" class="btn btn-primary btn-block w-100 py-2 text-uppercase">
      <template v-if="!posting">Enviar</template>
      <div v-else class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </button>
    <button @click.prevent="$router.go(-1)" class="btn btn-link btn-block w-100 py-2 text-uppercase">Cancelar</button>
  </form>
</div>
`

export default {      
    data() {
        return {           
           nombreMaterial: '',
           descripcion: '',
           imagenMaterial : ''
        }
    },
    methods : {
        generateMaterial: function () {
            let material = {
                nombre : this.nombreMaterial,
                imagen : this.imagenMaterial,
                descripcion : this.descripcion
            }             
            //Aca hago POST Api con el material.            
        }
    },
    computed : {
      verificado: function () {
        return true
      },
      posting: function () {
        return false
      }
    },
    template: AgregarMaterialTemplate,
    components: {
      'input-file': InputFile
    }
}