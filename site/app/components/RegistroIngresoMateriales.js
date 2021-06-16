import Api from '../api/Api.js'

const RegistroIngresoMaterialesTemplate = `
<bs-spinner v-if="loading"></bs-spinner>
<section v-else>

  <div class="row">
    <div class="col-md d-none d-md-block"></div>

    <div class="col-md">
    <!--<h4 class="h5">{{ recolectadoPor + (cartoneroId == null) ?  'null' : cartoneroId }}</h4>-->
      <p class="h6 ms-2">de <span class="fw-light">{{ infoRegistro.recolectadoPor }}</span></p>

      <div class="card mb-2">
        <div class="card-header">
          Nuevo material
        </div>
        <div class="card-body">

          <div class="form-group mb-2">
            <label>Material ingresado</label>
            <select v-model="nuevoMaterial.id_material" @change="seleccionarMaterial" 
              class="form-select form-select-sm" aria-label=".form-control-sm example">
              <option v-for="m of materiales_historicos" :value="m.id">{{ m.nombre }}</option>
            </select>
          </div>

          <div class="form-group mb-2">
            <label>Peso</label>
            <input v-model="nuevoMaterial.peso" 
              type="number" step="0.5" class="form-control form-control-sm">
          </div>


          <div class="d-flex justify-content-end">
            <bs-alert v-if="error != ''"
              class="py-1 my-1 me-3 w-100 text-center"
            >{{ error }}</bs-alert>
            <button @click="agregarMaterial" 
              type="button" class="btn btn-outline-primary">Add</button>
          </div>
        </div>
      </div>

      <h3 class="h5 my-2">Materiales Cargados</h3>

      <div v-if="materiales_cargados.length == 0" class="alert alert-secondary" role="alert">
        No hay materiales cargados
      </div>
      <div v-for="(material, i) of materiales_cargados" 
        class="card border border-1 mb-2">
        <div class="card-body">
          <blockquote class="blockquote mb-0 d-flex justify-content-between align-items-center">
            <div>
              <h3 class="h6 mb-0">{{ material.nombre }} ({{ material.peso }}kg)</h3>
            </div>
            <a @click="eliminarMaterial(i)" 
              class="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-trash-fill"
                viewBox="0 0 16 16">
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </a>
          </blockquote>
        </div>
      </div>
      
      <div class="d-grid gap-2">
        <btn-cancelar  label="Volver" class-list="btn btn-primary py-2"
        ></btn-cancelar>
      </div>
      </form>
    </div>
  
    <div class="col-md d-none d-md-block"></div>
  </div>

</section>
`

export default {
  // props: [ 'cartonero', 'recolectado' ],
  props: [ 'info-registro', 'modelValue' ],
  emits: ['update:modelValue'],
  data() {
    return {
      materiales_historicos: [],
      materiales_cargados: [],
      nuevoMaterial: {
        'id_material': null,
        'peso': null,
        'nombre': null
      },
      error: ''
    }
  },
  computed: {
    verificado() {
    },
    loading() {
      return this.materiales_historicos == undefined
    }
  },
  async created() {
    console.log('#id: ', this.infoRegistro)
    // console.log('#id: ', this.recolectado, this.cartonero)
    // console.log('#id: ', this.$route.params)
    const t = this
    Api.getData('admin/materiales-historicos').then(r => t.materiales_historicos = r)
  },
  mounted() {
    this.materiales_cargados = this.modelValue
  },
  methods: {
    seleccionarMaterial(e) {
      const select = e.currentTarget
      // console.log(select.value, select.options[select.selectedIndex].text)
      this.nuevoMaterial.nombre = select.options[select.selectedIndex].text;

    },
    agregarMaterial() {
      // console.log(this.nuevoMaterial)
      const t = this
      const m = {
        id_material: t.nuevoMaterial.id_material,
        nombre: t.nuevoMaterial.nombre,
        peso: parseInt(t.nuevoMaterial.peso)
      }
      // console.log(m)
      if (this.validarNuevoMaterial(m)) {
        let i = this.materiales_cargados.findIndex(m_cargado => m_cargado.id_material == m.id_material)
        if (i == -1) {
          this.materiales_cargados.push(m)
        }
        else {
          this.materiales_cargados[i].peso += m.peso
        }
        this.$emit('update:modelValue', this.materiales_cargados)
        for (let p in this.nuevoMaterial) { // reset form
          this.nuevoMaterial[p] = null
        }
      }
    },
    eliminarMaterial(i) {
      this.materiales_cargados.splice(i, 1)
      this.$emit('update:modelValue', this.materiales_cargados)
    },
    validarNuevoMaterial(m) {
      if (this.nuevoMaterial.id_material == null) {
        this.error = 'Seleccionar el material'
        return false
      }
      else if (Number.isNaN(m.peso)) {
        this.error = 'Insertar el peso'
        return false
      } else {
        this.error = ''
        return true
      } 
    }
  },
  template: RegistroIngresoMaterialesTemplate
}