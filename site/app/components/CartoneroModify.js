const CartoneroModifyTemplate = `
    
<template v-if="cartonero != undefined">
  <form class="p-2 form-control-sm" id="form-cartonero">

    <h3 v-if="cartonero.id == null" class="fs-1 mb-4">Añadir cartonero</h3>
    <h3 v-else class="fs-1 mb-4">Modificar {{cartonero.nombre}}</h3>

    <div class="p-2 form-control-sm">
      <div class="form-group mb-2">
        <label>Nombre</label>
        <input v-model.lazy="cartonero.nombre" type="text" class="form-control form-control-sm">
      </div>
      <div class="form-group mb-2">
        <label>Apellido</label>
        <input v-model.lazy="cartonero.apellido" type="text" class="form-control form-control-sm">
      </div>
      <div class="form-group mb-2">
        <label>DNI</label>
        <input v-model="cartonero.DNI" type="text" class="form-control form-control-sm">
      </div>
      <div class="form-group mb-2">
        <label>Direccion</label>
        <input v-model="cartonero.direccion" type="text" class="form-control form-control-sm">
      </div>
      <div class="form-group mb-2">
        <label>fecha de nacimiento</label>
        <input v-model="cartonero.nacimiento" type="date" class="form-control form-control-sm">
      </div>        
      <div class="form-group mb-2">
        <label for= "selectVolumen">Vehículo (capacidad ...)</label>
        <select v-model="cartonero.vehiculo" class="form-select form-select-sm" aria-label=".form-control-sm example" id= "selectVolumen">
          <option v-for="m of volumenesMateriales"
            :value="m.id"
          >{{ m.categoria }}</option>
    </div>

    <div v-if="this.error != null" 
      class="alert alert-danger" role="alert"
    > {{ this.error }}
    </div>

    <template v-if="!posting">
      <div class="d-grid gap-2 d-md-flex flex-md-row-reverse justify-content-md-start">
        <button :disabled="!verificado || posting" 
          @click.prevent="modifyCartonero"
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
          // cartoneroNombre : '',
          // cartoneroDescripcion : '',
          // cartoneroImagen : ''    
        }
    },
    computed : {
      
      cartonero: {
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
        modifyCartonero: function () {          
            if (this.cartonero.nombre /* apellido, blablabla*/ ){
                this.error = null
                // console.log(this.cartonero)
                this.guardar()
            }
            else {
              this.error = 'Seleccionar los datos requeridos'
            } 
        },
        guardar() {
          // console.log('# CartoneroModify : Guardando ', this.cartonero)
          this.$emit('guardar')
          // this.$emit('update:modelValue', this.selectedCartonero);
        },
        cancelar() {
          // console.log('# CartoneroModify >> Cancelando')
          if (this.cartonero.id == null) {
            // console.log('# CartoneroModify >> Cancelando creacion')
            this.cartonero = undefined
          }
          this.$emit('cancelar')
        }
    },

    template: CartoneroModifyTemplate,
    emits: ['update:modelValue', 'guardar', 'cancelar'],
    components: {
    }
}