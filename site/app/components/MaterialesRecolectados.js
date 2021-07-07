import Api from "../api/Api.js"
import CartoneroFilter from './CartoneroFilter.js'

const MaterialesRecolectadosTemplate = `

<bs-spinner v-if="loading"></bs-spinner>
<section v-else>

<h1 class="fs-1 mb-4">Materiales recolectados</h1>

<div class="row">
  <cartonero-filter 
    :cartoneros="cartoneros"
    @select-cartonero="selectCartonero"
  ></cartonero-filter>

<div class="col-md-7">
  <bs-spinner v-if="fetchingItem"></bs-spinner>
  <div v-else-if="cartonero != undefined" class=" card border-light mb-3 mt-4 mt-md-0">
      <div class="card tab-pane">
        <h5 class="card-header"
        >{{ getNombreCartonero(cartonero.cartonero_id) }}</h5>
        <div class="card-body">
          <template v-if="cartonero.materialesRecolectados.length > 0">
          <p class="card-text"> Los materiales recolectados son: </p>
          <ul>
            <li v-for="m of cartonero.materialesRecolectados"
            >{{ m.nombre }}: {{ m.pesoTotal }}kg</li>
          </ul>
          </template>
          <p v-else>No tiene materiales recolectados</p>
        </div>
      </div>
  </div>
</div>
</div>
</section>
<!-- </section> -->
`

export default {
    data() {
        return {
           cartoneros: undefined,
           cartonero: undefined,
           fetchingItem: false
        }
    },
    computed: {
      loading() {
        return this.cartoneros == undefined
      }
    },
    async created() {
      this.cartoneros = await Api.getCartoneros()
    },
    methods: {
      async selectCartonero(id) {
        console.log('fetching cartonero', id)
        this.fetchingItem = true
        const r = await Api.getMaterialesRecolectados(id)
        this.cartonero = r.data
        console.log(JSON.parse(JSON.stringify(this.cartonero)))
        this.fetchingItem = false
      },
      scrollToTabContent() {
          // document.querySelector('#pills-tabContent').scrollIntoView({
          //     behavior: 'smooth'
          // })
      },
      getNombreCartonero(id) {
        for (const c of this.cartoneros) {
          if (c.id == id) {
            return c.nombre + " " + c.apellido
          }
        }
      }
    },
    components: {
      'cartonero-filter': CartoneroFilter
    },
    template: MaterialesRecolectadosTemplate
}
