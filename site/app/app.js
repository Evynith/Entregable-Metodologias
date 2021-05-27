// components
import Nav from './components/Nav.js'
import AvisoRetiro from './components/AvisoRetiro.js'

const Home     = { template: '<div>Home</div>' }
const NotFound = { template: '<div>Not found</div>' }

//router
const routes = [
  { path: '/', component: Home },
  { path: '/ofrecer-materiales', component: AvisoRetiro },
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

app.mount('#app')