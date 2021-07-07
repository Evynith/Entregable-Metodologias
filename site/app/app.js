// components
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import Home from './components/Home.js'
import AvisoRetiro from './components/AvisoRetiro.js'
import MaterialesAceptados from './components/MaterialesAceptados.js'
import RegistroIngreso from './components/RegistroIngreso.js'
import RegistroIngresoMateriales from './components/RegistroIngresoMateriales.js'
import MaterialesAceptadosAdmin from './components/MaterialesAceptadosAdmin.js'
import MaterialesRecolectados from './components/MaterialesRecolectados.js'
import AvisosRetiro from './components/AvisosRetiro.js'
import RespuestaModal from './components/RespuestaModal.js'

const NotFound = { template: '<div>Not found</div>' }
const BtnCancelar = {
  template: `
<button @click.prevent="$router.go(-1)"
  :class="classList"
  >{{label}}</button>`,
  props: {
    label: { default: 'Cancelar' },
    link: { default: true },
    classList: { default: 'btn btn-block w-100 py-2 btn-link' }
  }

}
const BsSpinner = {
  template: `
  <div class="d-flex justify-content-center">
    <div class="spinner-border text-success" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
}
const BsAlert = {
  template: `
  <div class="alert alert-danger" role="alert">
    <slot></slot>
  </div>
  `
}

//router
const routes = [
  { path: '/', component: Home },
  { path: '/ofrecer-materiales', component: AvisoRetiro },
  { path: '/materiales-aceptados', component: MaterialesAceptados },
  { path: '/admin/materiales-recolectados', component: MaterialesRecolectados },
  { 
    path: '/admin/registro-ingreso', 
    component: RegistroIngreso,
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      { path: 'materiales', component: RegistroIngresoMateriales, props: true }
    ]
  },
  {
    path: '/admin/administrar-materiales', 
    component: MaterialesAceptadosAdmin,
    children: [
      // UserHome will be rendered inside User's <router-view>
      // when /user/:id is matched
      // { path: '/:id', component: MaterialesABM, props: true },
    ]
  },
  { path: '/admin/avisos-retiro', component: AvisosRetiro },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // { path: '*', component: NotFound }
]
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

// register components
app.component('app-nav', Nav)
app.component('app-footer', Footer)
app.component('app-home', Home)
app.component('btn-cancelar', BtnCancelar)
app.component('bs-spinner', BsSpinner)
app.component('bs-alert', BsAlert)
app.component('respuesta-modal', RespuestaModal)

app.mount('#app')