const MaterialesRecolectadosTemplate = `
<!-- 
<div v-if="loading" class="d-flex justify-content-center">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
<section v-else> -->
  <section>
  <h1 class="fs-1 mb-4">Materiales recolectados</h1>

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

<div class="col-md-7">
  <div class=" card border-light mb-3 mt-4 mt-md-0">
      <div class="card tab-pane">
        <h5 class="card-header" >Guillermina MENENDEZ</h5>
        <div class="card-body">
          <p class="card-text"> Los materiales recolectados son: </p>
          <ul>
            <li>Tetra-brick: 7kg</li>
            <li>Metales: 2.8kg</li>
            <li>Plástico: 8kg</li>
            <li>Tapitas: 4.2kg</li>
            <li>Papel: 6kg</li>
          </ul>
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
           
        }
    },
    computed: {
      // loading() {
      //   return this.materiales == undefined
      // }
    },
    methods: {
        scrollToTabContent() {
            // document.querySelector('#pills-tabContent').scrollIntoView({
            //     behavior: 'smooth'
            // })
        }
    },
    template: MaterialesRecolectadosTemplate
}