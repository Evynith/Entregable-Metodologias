const CartoneroFilterTemplate = `
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
        <li v-for="(c, i) of cartonerosMatchingQuery"
          role="presentation" class="my-1 ps-1 pe-1 d-grid gap-2"
        >
          <button type="button" class="btn btn-success"
          @click="updateSelectedItem(c.id)"
          > {{ c.nombre + " " + c.apellido }}
          </button>
        </li>
    </ul>
  </div>
`

export default {
  template: CartoneroFilterTemplate,
  props: [ 'cartoneros' ],
  emits: [ 'selectCartonero' ],
  data() {
    return {
      searchQuery: ''
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
    }
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
    updateSelectedItem(id) {
      this.$emit('selectCartonero', id)
    }
  }
}