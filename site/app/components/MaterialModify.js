import Api from '../api/Api.js'
import InputFile from './InputFile.js'

const MaterialModifyTemplate = `
    
<template v-if="material != undefined">
  <form class="p-2 form-control-sm" id="form-material">

    <h3 v-if="material.id == null" class="fs-1 mb-4">Añadir material</h3>
    <h3 v-else class="fs-1 mb-4">Modificar {{material.nombre}}</h3>

    <div class="form-group mb-2">
    <label for="exampleFormControlTextarea1" class="form-label">Nombre *</label>
      <input v-model="material.nombre" type="text" class="form-control form-control-sm">
    </div>
    <div class="form-group mb-2">
      <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
      <textarea v-model="material.descripcion" class="form-control" rows="3"></textarea>
    </div>
    <div class="form-group mb-3">
      <label for="formFile">Cargar {{ (material.id == null) ? '' : 'nueva' }} imagen del material *</label>
      <input-file v-model="material.imagen" type="img" accept="image/*"></input-file>
    </div>

    <div v-if="this.error != null" 
      class="alert alert-danger" role="alert"
    > {{ this.error }}
    </div>

    <template v-if="!posting">
      <div class="d-grid gap-2 d-md-flex flex-md-row-reverse justify-content-md-start">
        <button :disabled="!verificado || posting" 
          @click.prevent="modifyMaterial"
          class="btn btn-primary btn-block py-2"
          type="button"
        >
          Guardar
        </button>
        <button @click.prevent="cancelar" 
          class="btn btn-link btn-block py-2 me-md-2"
          type="button"
        >Cancelar</button>
      </div>
    </template>
    <bs-spinner v-else></bs-spinner>
  </form>
</template>
    
`

export default {
    props : ['modelValue', 'posting'],
    data() {
        return {
          backup: undefined,
          error: null
          // materialNombre : '',
          // materialDescripcion : '',
          // materialImagen : ''    
        }
    },
    computed : {
      
      material: {
        get() {
            return this.modelValue;
        },
        set(val) {
          this.$emit('update:modelValue', val);
        }
      },
      verificado: function () {
        return true
      }
    },
    methods : {
        modifyMaterial: function () {          
            if (this.material.nombre 
                && this.material.imagen 
                && this.material.imagen != './images/materiales/no-image.png') { // ¡!¡!
                
                this.error = null
                // console.log(this.material)
                this.guardar()
            }
            else {
              this.error = 'Seleccionar los datos requeridos'
            } 
        },
        guardar() {
          // console.log('# MaterialModify : Guardando ', this.material)
          this.$emit('guardar')
          // this.$emit('update:modelValue', this.selectedMaterial);
        },
        cancelar() {
          // console.log('# MaterialModify >> Cancelando')
          if (this.material.id == null) {
            // console.log('# MaterialModify >> Cancelando creacion')
            this.material = undefined
          }
          this.$emit('cancelar')
        }
    },

    template: MaterialModifyTemplate,
    emits: ['update:modelValue', 'guardar', 'cancelar'],
    components: {
      'input-file': InputFile
    }
}