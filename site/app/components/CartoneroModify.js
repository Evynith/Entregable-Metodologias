import Api from '../api/Api.js'
const CartoneroModifyTemplate = `

<bs-spinner v-if="loading"></bs-spinner>
<template v-else-if="cartonero != undefined">
  <form class="p-2 form-control-sm" id="form-cartonero">

    <!-- <h4 v-if="cartonero.id == null">Añadir cartonero</h4>
    <h4 v-else class="fs-4 mb-4">Modificar <i>{{cartonero.apellido + ", " + cartonero.nombre}}</i></h4> -->

    <h4>
      <template v-if="cartonero.id == null">Añadir cartonero</template>
      <template v-else>Modificar <i>{{cartonero.apellido + ", " + cartonero.nombre}}</i></template>
    </h4>

    <div class="p-2 form-control-sm">
      <div class="form-group mb-2">
        <label>Nombre</label>
        <input v-model="cartonero.nombre" type="text" class="form-control form-control-sm">
        <!-- <input v-model="cartoneroNombre" type="text" class="form-control form-control-sm"> -->
      </div>
      <div class="form-group mb-2">
        <label>Apellido</label>
        <input v-model="cartonero.apellido" type="text" class="form-control form-control-sm">
        <!-- <input v-model="cartoneroApellido" type="text" class="form-control form-control-sm"> -->
      </div>
      <div class="form-group mb-2">
        <label>DNI</label>
        <input v-model="cartonero.dni" type="number" class="form-control form-control-sm">
        <!-- <input v-model="cartoneroDni" type="text" class="form-control form-control-sm"> -->
      </div>
      <div class="form-group mb-2">
        <label>Direccion</label>
        <input v-model="cartonero.direccion" type="text" class="form-control form-control-sm">
        <!-- <input v-model="cartoneroDireccion" type="text" class="form-control form-control-sm"> -->
      </div>
      <div class="form-group mb-2">
        <label>Fecha de nacimiento</label>
        <input v-model="cartonero.fecha_nacimiento" type="date" class="form-control form-control-sm">
        <!-- <input v-model="cartoneroFechaNacimiento" type="date" class="form-control form-control-sm"> -->
      </div>        
      <div class="form-group mb-2">
        <label for="selectVolumen">Vehículo (capacidad ...)</label>
        <!-- <select v-model="cartoneroVehiculoVolumen"  -->
        <select v-model="cartonero.vehiculo_volumen" 
          class="form-select form-select-sm" id= "selectVolumen">
          <option v-for="v of volumenesMateriales" :value="v.id"
          >{{ v.categoria }}</option>
        </select>
      </div>
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
          error: null,
          volumenesMateriales: undefined,
          cartonero: undefined
        }
    },
    computed : {
      loading() {
        return this.volumenesMateriales == undefined
      },
      
      // cartonero: {
        // get() {
        //     // return this.convertirAPosteable(this.modelValue)
        //     return this.modelValue
        // },
        // set(val) { // como se modifican propiedades del objeto, nunca se ejecutaba
        //   console.log(val)
        //   this.$emit('update:modelValue', val);
        // }
      // },
      verificado() {
        return true
      }
    },
    watch: {
      cartonero: {
        handler(val, oldVal) { // muestran el mismo objeto (pq como es objeto se pasa por referencia)...uso modelValue para comparar
          // console.log('#CartoneroModify - updated cartonero desde', this.modelValue, ' a ', val)
          if (val == undefined) { // si esta cancelando la creacion
            this.$emit('update:modelValue', val)
          }
          else if (val.id) { // solo si es edit notifica los cambios
            this.$emit('update:modelValue', this.convertirAVisible(val)) // desestructura pq si se pasa asi nomas (por referencia), modelValue pasa a ser el mismo objeto 
          }
        },
        deep: true // pra que detecte cambios en propiedades y no solo cuando se reasigna (cartonero = otraCosa),
      },
    },
    methods : {
      convertirAPosteable(cartoneroVisible) {
        const posteable = { ...cartoneroVisible }
        if (posteable.id) { // si es editar hay que convertir los datos para que se carguen bien los inputs
          let [ dia, mes, anio ] = cartoneroVisible.fecha_nacimiento.split('/')
          if (mes.length == 1) mes = 0 + mes
          if (dia.length == 1) dia = 0 + dia
          posteable.fecha_nacimiento = [ anio, mes, dia ].join('-')
          posteable.vehiculo_volumen = this.volumenesMateriales.find(v => v.cod_categoria == cartoneroVisible.vehiculo_volumen).id
        }
        return posteable;
      },
      convertirAVisible(cartoneroPosteable) {
        const visible = { ...cartoneroPosteable }
        let [ anio, mes, dia ] = cartoneroPosteable.fecha_nacimiento.split('-')
        // if (mes.length == 1) mes = 0 + mes
        // if (dia.length == 1) dia = 0 + dia
        visible.fecha_nacimiento = [ dia, mes, anio ].join('/')
        visible.vehiculo_volumen = this.volumenesMateriales.find(v => v.id == cartoneroPosteable.vehiculo_volumen).cod_categoria

        return visible
      },
      modifyCartonero: function () {          
        const datosCargados = this.cartonero.nombre && this.cartonero.apellido && this.cartonero.dni && this.cartonero.direccion && this.cartonero.fecha_nacimiento && this.cartonero.vehiculo_volumen
        if (datosCargados){
          this.error = null
          // console.log(this.cartonero)
          this.guardar()
        }
        else {
          this.error = 'Seleccionar los datos requeridos'
        } 
      },
      guardar() {
        // console.log('#CartoneroModify : Guardando ', this.cartonero)
        this.$emit('guardar', JSON.parse(JSON.stringify(this.cartonero)))
        // this.$emit('update:modelValue', this.selectedCartonero);
      },
      cancelar() {
        console.log('# CartoneroModify >> Cancelando')
        if (this.cartonero.id == null) {
          // console.log('# CartoneroModify >> Cancelando creacion')
          this.cartonero = undefined
        }
        this.$emit('cancelar')
      }
    },
    async mounted() {
      this.volumenesMateriales = await Api.getVolumenesMateriales()
      this.cartonero = this.convertirAPosteable(this.modelValue)
    },
    template: CartoneroModifyTemplate,
    emits: ['update:modelValue', 'guardar', 'cancelar'],
    components: {
    }
}