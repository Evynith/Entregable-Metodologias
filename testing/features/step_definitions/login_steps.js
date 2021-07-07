module.exports = function () {
    
    //(then del feature)
    this.Then(/^Recibo una alerta en login que dice ([^"]*)$/, function (respuesta) {
        // driver wait returns a promise so return that
        return page.login.enviar()
        .then(
            ()=> driver.wait(until.elementsLocated(by.css('p.alert')), 10000)
        ) 
        .then(() => driver.findElement(by.css('p.alert')))
        //element es de tipo webdriver
        .then((element) => element.getText())

        .then(function(innerText) {
            let validacionTexto = innerText.includes(respuesta);
            console.log(innerText)
            //debe dar true la condicien del assert para pasar el test
            assert(validacionTexto, 'No cumple con el mensaje esperado');
        });
    });

    this.When(/^Cargo el usuario ([^"]*)$/, function(usuario) {

        return helpers.loadPage(page.login.url)
           
        .then(function(){
            return shared.ayudante.esperarCarga(page.login.enviarUsuario, usuario);
        })
    });
    this.When(/^Cargo la contraseña ([^"]*)$/, function(contrasenia) { 
        return page.login.enviarContrasenia(contrasenia);
    });
};