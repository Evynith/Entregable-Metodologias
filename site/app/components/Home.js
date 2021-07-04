export default { 
    template : `

    <div class="portada position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div class="col-md-5 p-lg-5 mx-auto my-5">
            <img src="./images/logo.png" class="logo-p" alt="...">
            <p class="text-coop"> <b>COOPERATIVA DE RECICLAJE</b></p>
        </div>
    </div>

    <div class="text-center">
        <div>
            <p class="fibron fs-1 text-success">40%</p>
            <p>de los residuos son potencialmente reciclables</p>
        </div>
        <div>
            <p class="fibron fs-1 text-success">10.000</p>
            <p>recuperadores urbanos trabajan en toda la Argentina</p>
        </div>
        <div>
            <p class="fibron fs-1 text-success">2,1 ton</p>
            <p>persona/mes es la productividad promedio</p>
        </div>
    </div>

    <div class="text-center cuadro-dialogo-home">
        <p>Los recicladores son actores económicos que desempeñan un servicio público que  contribuye a la sociedad y a la protección del medioambiente” - IRR</p>
    </div>
    
    <h1 class="text-center m-4">¡Hacé tu parte!</h1>
    
    <div class="row">
        <div class="col-md d-none d-md-block"></div>

        <div class="col-md">
            <div class="mb-2">
                <div class="d-flex flex-row">
                    <p class="fibron fs-1 m-2">1.</p>
                    <p><b>Informate acerca de que materiales aceptamos y como prepararlos.</b></p>
                </div>
        
                <div class="d-grid gap-2 col-6 mx-auto">
                    <router-link to="/materiales-aceptados" class="btn btn-primary">Ver materiales aceptados</router-link>
                </div>
                
            </div>
            <div class="mb-2">
                <div class="d-flex flex-row">
                    <p class="fibron fs-1 m-2">2.</p>
                    <p><b>Generá avisos de retiro de materiales para que nuestros recicladores pasen a buscarlos.</b></p>
                </div>
        
                <div class="d-grid gap-2 col-6 mx-auto">
                    <router-link to="/ofrecer-materiales" class="btn btn-primary">Generar aviso de retiro</router-link>
                </div>
                
            </div>
        </div>

        <div class="col-md d-none d-md-block"></div>
    </div>
    `
}