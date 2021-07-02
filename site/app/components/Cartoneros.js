import CartoneroABM from './CartoneroABM.js'

const CartonerosTemplate = `

<section>
  <header class="d-flex align-items-center mt-2 mb-4">  <!-- class="d-flex justify-content-around" --> <!-- cuando aparece botón se le agrega esas clases a header-->
    <h1 class="d-flex justify-content-start fs-1 me-4">Listado de cartoneros</h1> 
  
    <a @click="addCartonero" > 
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2196F3" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
      </svg>
    </a> 
  </header>

  <!-- <bs-spinner v-if="loading">
  </bs-spinner> -->

  <div class="row">
    <div class="col-md-5">
      <div class="input-group pe-md-4">
        <input class="form-control " type="search" placeholder="Buscar por nombre o apellido" aria-describedby="btn-buscar">
        <button class="btn  btn-outline-success" id="btn-buscar" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
      <p class="text-muted small mb-0 mt-2">(3 cartoneros)</p>
      <ul class="nav d-flex flex-column justify-content-center pe-md-1 elementos-material" id="pills-tab" role="tablist">
        <li role="presentation" class="my-1 ps-1 pe-1 d-grid gap-2">
          <button type="button" role="tab" data-bs-toggle="pill" class="btn btn-success"
            @click="scrollToTabContent"
          >
          Guillermina MENENDEZ
          </button>
          <button type="button" role="tab" data-bs-toggle="pill" class="btn btn-success"
            @click="scrollToTabContent"
          >
          Hernesto GUTIERRES
          </button>
          <button type="button" role="tab" data-bs-toggle="pill" class="btn btn-success"
            @click="scrollToTabContent"
          >
          Hernesto GUTIERRES
          </button>
        </li>
      </ul>
    </div>

    <!-- <div v-if="respuesta != undefined" 
      :class="['alert', 'mt-4', { 'alert-danger': ! respuesta.ok, 'alert-success': respuesta.ok }]" role="alert"
    >
      {{ mensajeRespuesta }}
    </div> -->

    <div class="col-md-8">
      <cartonero-abm 
        v-model="selectedItem"
        @updated="resync"
        @cancelar-creacion="cartoneros.shift()"
        @cancelar-edicion="cancelarEdicion"
        @responded="manejarRespuesta"
      ></cartonero-abm>
    </div>

</section>
<!-- </section> -->
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
          posting: false,
          selectedItem: undefined,
          state: '',
          respuesta: undefined
        }
    },
    computed: {
      mensajeRespuesta() {
        if (this.respuesta != undefined) {
          if (this.respuesta.mensaje != undefined || ! this.respuesta.ok) {
            return this.respuesta.mensaje
          }
          else {
            return `Operación realizada con éxito`
          }
        }
      },
      verificado() {
        return true
      },
      loading() {
        return this.cartoneros == undefined
      }
    },
    async mounted() {
      // console.log(MostrarCartonero, ModificarCartonero)
      this.getCartoneros()
    },
    methods: {
      manejarRespuesta(r) {
        this.respuesta = r
        const t = this
        setTimeout(() => {
          t.respuesta = undefined
        }, 5000)
      },
      cancelarEdicion() {
        this.cartoneross[this.cartoneros.findIndex((m)=>m.id == this.selectedItem.id)] = this.selectedItem
      },
      async resync(id = null) {
        this.cartoneros = undefined
        const t = this
        setTimeout(async () => {
          await t.getCartoneros()
          if (id != null) { // si es put o delete
            let index = t.cartoneros.findIndex((m)=>m.id == id)
            if (index != -1) { // si no fue borrado
              this.selectedItem = this.cartoneros[index]
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

        this.cartoneros = await Api.getCartonerosAceptados()
        if (this.cartoneros.ok != undefined) {
          console.log('# error get Cartoneros : Cartoneros ', this.cartoneros.mensaje)
          this.cartoneros = []
          setTimeout(this.getCartoneros, 1000)
        }
        console.log('pude obtener datos', this.cartoneros)
      
    },
    addCartonero() {
      this.selectedItem = {
        "id": null,
        "nombre": "",
        "apellido": "",
        "DNI": "",
        "direccion": "",
        "nacimiento": "",
        "vehiculo": ""
      }
      this.cartoneros.unshift(this.selectedItem)
    },
    updateSelectedItem: function updateSelectedItem(cartonero) {
      this.selectedItem = cartonero;
    }
  },
    template: CartonerosTemplate,
    components: {
      'cartonero-abm': CartoneroABM
    }
}