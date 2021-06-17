export default { 
  template : `
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top" id="app-nav">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="./images/logo.png" alt="log" width="46" >
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mt-2">
        <li class="nav-item">
          <router-link to="/ofrecer-materiales" class="nav-link">Ofrecer materiales</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/materiales-aceptados" class="nav-link">Materiales aceptados</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Admin</a>
          <ul class="dropdown-menu">
            <li class="nav-item">
              <router-link to="/admin/registro-ingreso" class="dropdown-item">Registrar ingreso de material</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/avisos-retiro" class="dropdown-item">Avisos de retiro</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/administrar-materiales" class="dropdown-item">Administrar materiales</router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item disabled" href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>`
}