const RegistroAdminTemplate =`
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
                <h1 class="fs-1 text-center"> Registrarse</h1>
                <p> Llene el siguiente formulario con sus datos para poder acceder al sistema y recibir información en su e-mail. </p>
                <form action="" id= "form-re">
                    <div class="form-group mb-2">
                        <label>Nombre de usuario</label>
                        <input v-model.lazy="re.usuario" type="text" class="form-control form-control-sm">
                    </div>
                    <div class="form-group mb-2">
                        <label>Contraseña</label>
                        <input v-model.lazy="re.contrasenia" type="password" class="form-control form-control-sm">
                    </div>
                    <div class="form-group mb-2">
                        <label>Reingrese su contraseña</label>
                        <input v-model.lazy="re.contraseniaReingreso" type="password" class="form-control form-control-sm">
                    </div>
                    <div class="form-group mb-2">
                        <label>e-mail</label>
                        <input v-model.lazy="re.email" type="email" class="form-control form-control-sm">
                    </div>
                    <div class="form-group mb-2">
                        <label>Reingrese su e-mail</label>
                        <input v-model.lazy="re.emailReingreso" type="email" class="form-control form-control-sm">
                    </div>
        
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="button">Registrarse</button>
                        <button class="btn btn-link" type="button">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</section>
    `
export default {
    data() {
        return {
            re: {
                usuario: '',
                contrasenia: '',
                contraseniaReingreso: "",
                email: "",
                emailReingreso: ""
            }
        }
    },
    template: RegistroAdminTemplate,
}