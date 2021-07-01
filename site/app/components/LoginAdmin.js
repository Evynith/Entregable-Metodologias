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
                <form action="" id= "form-la">
                    <div class="form-group mb-2">
                        <label>Usuario</label>
                        <input v-model.lazy="la.usuario" type="text" class="form-control form-control-sm">
                    </div>
                    <div class="form-group mb-2">
                        <label>Contraseña</label>
                        <input v-model.lazy="la.contrasenia" type="password" class="form-control form-control-sm">
                    </div>
        
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="button">Ingresar</button>
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
            la: {
                nombre: '',
                contrasenia: ''
            }
        }
    },
    template: LoginAdminTemplate,
}