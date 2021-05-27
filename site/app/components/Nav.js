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
      </ul>
    </div>
  </div>
</nav>`
}