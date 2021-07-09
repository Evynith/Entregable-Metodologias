export default { 
    template : `
    <div class="contenedor-general-footer mt-4">
    
        <div class="row row-cols-1 row-cols-md-3 text-center pt-3 m-0" >

            <div class="col pt-3">
                <h5>Comenzar</h5>
                <ul class="ps-0">
                    <li>
                        <router-link to="/" class="btn btn-link">Inicio</router-link>
                    </li>
                    <li>
                        <router-link to="/materiales-aceptados" class="btn btn-link">Ver materiales aceptados</router-link>
                    </li>
                    <li>
                        <router-link to="/ofrecer-materiales" class="btn btn-link">Generar aviso de retiro</router-link>
                    </li>
                </ul>
            </div>

            <div class="col pt-3">
                <h5>Cooperativa reciclaje</h5>
                <p>
                    La Cooperativa de Recuperadores Urbanos de Tandil es un grupo de cartoneros que se agruparon con el objetivo de obtener mejores precios por los elementos reciclables que juntan. 
                </p>
            </div>

            <div class="col pt-3">
                <h5>Contacto</h5>
                <ul class="ps-0">
                    <li>Hipólito Yrigoyen 1178, Tandil, Bs As, Argentina</li>
                    <li>tel/fax: 000000000000</li>
                    <li>email@ejemplo.com</li>
                </ul>
            </div>
        </div>
         
         
        <section class="social-icons d-flex justify-content-center">
            <a href="www.facebook.com">             <img src="./images/icons/facebook.png">  </a>
            <a href="../images/icons/instagram.png"><img src="./images/icons/instagram.png"> </a>
            <a href="../icons/twitter.png">         <img src="./images/icons/twitter.png">   </a>
        </section>      
    </div>`
}