import Api from '../api/Api.js'
import CartoneroABM from './CartoneroABM.js'

const CartonerosTemplate = `
<section class="container-sm">
  <header class="d-flex align-items-center mt-2 mb-4">  <!-- class="d-flex justify-content-around" --> <!-- cuando aparece botón se le agrega esas clases a header-->
    <h1 class="d-flex justify-content-start fs-1 me-4">Listado de cartoneros</h1> 
  
    <a @click="addCartonero" > 
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2196F3" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
      </svg>
    </a> 
  </header>

  <bs-spinner v-if="fetching">
  </bs-spinner> 
  <div v-else class="row">
    <div class="col-md-4">
      <div class="input-group pe-md-4">
        <input class="form-control" v-model="searchQuery" type="search" placeholder="Buscar por nombre o apellido" aria-describedby="btn-buscar">
        <button class="btn  btn-outline-success" id="btn-buscar" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
      <p class="text-muted small mb-0 mt-2" v-html="totMatchingQuery"></p>
      <ul class="nav d-flex flex-column justify-content-center pe-md-1 elementos-material">
        <!-- <template v-for="(c, i) of cartoneros"> -->
          <!-- <li v-if="c!=undefined && matcheaSearchQuery(c)" -->
          <li v-for="(c, i) of cartonerosMatchingQuery"
            role="presentation" class="my-1 ps-1 pe-1 d-grid gap-2"
          >
            <button type="button" class="btn btn-success"
            @click="updateSelectedItem(c.id)"
            > {{ c.nombre + " " + c.apellido }}
            </button>
          </li>
      <!-- </template> -->
      </ul>
    </div>


    <div class="col-md-8">
      <cartonero-abm 
        v-model="selectedItem"
        :actualizando="actualizando"
        @updated="resync"
        @cancelar-creacion="cancelarCreacion"
        @cancelar-edicion="cancelarEdicion"
        @responded="manejarRespuesta"
      ></cartonero-abm>
    </div>
  </div>

  <respuesta-modal v-model="respuesta" r-id="respuesta-abmCartoneros"></respuesta-modal>
</section>
`

export default {
    data() {
        return {
          // datosCartonero: {
          //   nombre: "",
          //   apellido: "",
          //   DNI: "",
          //   direccion: "",
          //   nacimiento: "",
          //   vehiculo: ""
          // },
          cartoneros: undefined,
          searchQuery: '',
          posting: false,
          actualizando: false,
          selectedItem: undefined,
          state: '',
          respuesta: undefined
        }
    },
    computed: {
      totMatchingQuery() {
        const l = this.cartonerosMatchingQuery.length
        return `(${l} cartonero${(l > 1 ? 's' : '')})`
      },
      cartonerosMatchingQuery() {
        let cartoneros = []
        for (const c of this.cartoneros) {
          if (this.matcheaSearchQuery(c)) {
            cartoneros.push(c)
          }
        }
        return cartoneros
      },
      verificado() {
        return true
      },
      fetching() {
        return this.cartoneros == undefined
      }
    },
    watch: {
      selectedItem: {
        handler: function (val, oldVal) { // si modifica nombre o apellido lo actualiza en el array
          // console.log('#CartneroAdmin - updated selectedValue desde', oldVal, ' a ', val)
          if (val != undefined && val.id) { // solo si es editar el cartonero esta en el array
            let itemIndex = this.cartoneros.findIndex((c) => c.id == val.id)
            const arrayItem = this.cartoneros[itemIndex]
            const { id, nombre, apellido } = val
            if (arrayItem.nombre != nombre || arrayItem.apellido != apellido) {
              const itemUpdated = { id, nombre, apellido }
              this.cartoneros[itemIndex] = itemUpdated
              console.log('#CartneroAdmin - updated arrayItem ', this.cartoneros[itemIndex], ' a ', itemUpdated )
            }
          }
        },
        deep: true
      }
    },
    async mounted() {
      // console.log(MostrarCartonero, ModificarCartonero)
      this.getCartoneros()
    },
    methods: {
      matcheaSearchQuery(c) {
        // console.log('Filtrando ', this.searchQuery)
        const { nombre, apellido } = c
        const re = new RegExp(`^${this.searchQuery}`, 'gi')
        // console.log('Regexp ', nombre, ' ', apellido, re.test(nombre) || re.test(apellido))
        return this.searchQuery == '' ? true : 
          re.test(nombre) || re.test(apellido)
      },
      manejarRespuesta(r) {
        this.respuesta = r
        // const t = this
        // setTimeout(() => {
        //   t.respuesta = undefined
        // }, 5000)
      },
      cancelarEdicion() {
        const { id, nombre, apellido } = this.selectedItem // solo guarda los datos minimos
        this.cartoneros[this.cartoneros.findIndex((c)=> c.id == this.selectedItem.id)] = { id, nombre, apellido }
      },
      cancelarCreacion() { // se deberia cancelar solo (Modify lo hace undefined)
        // this.cartoneros.shift()
      },
      async resync(id = null) {
        this.cartoneros = undefined
        const t = this
        setTimeout(async () => {
          await t.getCartoneros()
          if (id != null) { // si es put o delete
            let index = t.cartoneros.findIndex((m)=>m.id == id)
            if (index != -1) { // si no fue borrado
              this.updateSelectedItem(id)
            }
            else {
              console.log(`# No existe el cartonero ${id} : Cartoneros`)
            }
          }
          else { // si es delete
            this.selectedItem = undefined
            console.log(`# Cartonero eliminado (o post) : Cartoneros`)
          }
        }, 500)
      },
      async getCartoneros() {

        this.cartoneros = await Api.getCartoneros()
        // this.updateSelectedItem(1)
        // if (this.cartoneros.ok != undefined) {
        //   console.log('# error get Cartoneros : Cartoneros ', this.cartoneros.mensaje)
        //   this.cartoneros = []
        //   setTimeout(this.getCartoneros, 1000)
        // }
        // console.log('pude obtener datos', this.cartoneros)
      
    },
    addCartonero() {
      this.selectedItem = {
        "id": null,
        "dni": undefined,
        "nombre": "",
        "apellido": "",
        "direccion": "",
        "fecha_nacimiento": undefined,
        "vehiculo_volumen": undefined // el id
      }
      // this.cartoneros.unshift(this.selectedItem)
    },
    updateSelectedItem: async function (id) {
      this.actualizando = true
      this.selectedItem = undefined
      const cartoneroRecibido = await Api.getCartonero(id);
      // let cartoneroMostrado = { ...cartoneroRecibido }
      // const fecha = new Date(cartoneroRecibido.fecha_nacimiento)
      // cartoneroMostrado.fecha_nacimiento = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`
      // cartoneroMostrado.fecha_nacimiento = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
      // cartoneroMostrado.fecha_nacimiento = fecha.toLocaleString() // tiene tmb la hora del dia
      // this.selectedItem = cartoneroMostrado
      this.selectedItem = cartoneroRecibido
      this.actualizando = false
    }
  },
    template: CartonerosTemplate,
    components: {
      'cartonero-abm': CartoneroABM
    }
}