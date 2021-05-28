import Api from '../api/Api.js'

const MaterialesAceptadosTemplate = `

<div v-if="loading" class="d-flex justify-content-center">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
<section v-else>
  <h1 class="fs-1 text-center mb-4">Materiales aceptados</h1>

  <ul class="nav d-flex justify-content-between mb-3" id="pills-tab" role="tablist">
    <li v-for="(m, i) of materiales" role="presentation" class="my-1" style="width: 32%;">
      <button type="button" role="tab" data-bs-toggle="pill"
        :id="getPillsId(i)"
        :class="['card', 'px-0', { 'active': i == 0} ]"
        :data-bs-target="getTabTarget(i)" 
        :aria-controls="getTabId(i)"
        @click="scrollToTabContent"
      >
        <img :src="m.imagen" class="card-img-top">
        <span v-html="m.nombre" class="w-100 text-center py-1 small"></span>
      </button>
    </li>
  </ul>
  
  <div class="tab-content" id="pills-tabContent">
    <div v-for="(m, i) of materiales" 
      :class="['card', 'tab-pane', 'fade', { 'show': i == 0, 'active': i == 0 }]" 
      :id="getTabId(i)" 
      :aria-labelledby="getPillsId(i)" role="tabpanel"
    >
      <h5 class="card-header" v-html="m.nombre"></h5>
      <div class="card-body">
        <!-- <h5 class="card-title">Special title treatment</h5> -->
        <p class="card-text" v-html="m.descripcion"></p>
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
      </div>
    </div>
  </div>

</section>
`

export default {
    data() {
        return {
            materiales: undefined
        }
    },
    computed: {
      loading() {
        return this.materiales == undefined
      }
    },
    async mounted() {
        this.materiales = await Api.getMaterialesAceptados()
        // console.log('pude obtener datos', this.materiales)
    },
    methods: {
        getTabId(i)     { return `pills-${i}` },
        getTabTarget(i) { return `#${this.getTabId(i)}` },
        getPillsId(i)   { return `pills-${i}-tab` },

        scrollToTabContent() {
            document.querySelector('#pills-tabContent').scrollIntoView({
                behavior: 'smooth'
            })
        }
    },
    template: MaterialesAceptadosTemplate
}