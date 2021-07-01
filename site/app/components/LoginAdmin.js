const LoginAdminTemplate =`
<section class="m-0 container-fluid">
    <div class="row">
        <div class="portada position-relative overflow-hidden col-md-8 text-center bg-light">
            <div class="col-md-5 p-lg-5 mx-auto my-5">
                <img src="./images/logo.png" class="logo-p" alt="...">
                <p class="text-coop"> <b>COOPERATIVA DE RECICLAJE</b></p>
            </div>
        </div>
    
        <div class="col-md-4 p-3 m-0 d-flex align-items-center justify-content-center flex-column">
            <div class="">
                <h1 class="fs-1 text-center"> ¡Bienvenide!</h1>
                <p>Ingrese su usuario y contraseña para acceder al sistema</p>
                <form @submit.prevent="post">
                    <div class="form-group mb-2">
                        <label>Usuario</label>
                        <input v-model="datosLogin.usuario" type="text" class="form-control form-control-sm">
                    </div>
                    <div class="form-group mb-2">
                        <label>Contraseña</label>
                        <input v-model="datosLogin.contrasenia" type="password" class="form-control form-control-sm">
                    </div>
        
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary">Ingresar</button>
                    </div>
                    <p v-if="mensajeError != ''" class="alert alert-danger mt-4">{{ mensajeError }}</p>
                </form>
            </div>
        </div>
        
    </div>
</section>
    `
export default {
    data() {
            return {
                datosLogin: {
                    usuario: "",
                    contrasenia: ""
                },
                mensajeError: ''
        }
    },
    computed: {
        verificado() {
            return this.datosLogin.contrasenia != "" && this.datosLogin.usuario != ""
        }
    },
    methods: {
        post() {
            if(this.verificado){
                console.log("posteando", this.datosLogin);
                this.mensajeError = "";
            } else {
                this.mensajeError = "Faltan ingresar datos";
            }
        }
    },
    template: LoginAdminTemplate,
}