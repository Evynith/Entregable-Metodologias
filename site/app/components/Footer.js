export default { 
    template : `
    <div class="contenedor-general-footer">
        <div class="bloques-footer" >
            <div>
                <h5>Comenzar</h5>
                <ul>
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

            <div class="estado">
                <h5>Soporte</h5>
                <ul>
                    <li><a href="./contacto.html">Contáctanos</a></li>
                    <li><a href="./preguntas-frecuentes.html">Ayuda</a></li>
                </ul>
            </div>

            <div  class="estado">
                <h5>Legal</h5>
                <ul>
                    <li><a href="#">Términos y condiciones</a></li>
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