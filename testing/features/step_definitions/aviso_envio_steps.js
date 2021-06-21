module.exports = function () {
    
    //(then del feature)
    this.Then(/^Recibo una notificación que dice ([^"]*)$/, function (respuesta) {
        // driver wait returns a promise so return that
        return driver.wait(until.elementsLocated(by.css('.modal-body > p')), 10000)
        .then(() => driver.findElement(by.css('.modal-body > p')))
        //element es de tipo webdriver
        .then((element) => element.getText())

        .then(function(innerText) {
             let validacionTexto = innerText.includes(respuesta);

            //debe dar true la condicien del assert para pasar el test
            assert(validacionTexto, 'No cumple con el mensaje esperado');
        });
    });

    this.When(/^Escribo el nombre ([^"]*)$/, function(nombre) {

        return helpers.loadPage('https://federico-de-muguruza.github.io/tpe_metodologias/#/ofrecer-materiales')
           
        .then(function(){
            return shared.ayudante.esperarCarga(page.avisoEnvio.enviarNombre, nombre);
        })
    });
    this.When(/^Escribo el apellido ([^"]*)$/, function(apellido) { 
        return page.avisoEnvio.enviarApellido(apellido);
    });
    this.When(/^Escribo la dirección ([^"]*)$/, function(direccion) { 
        return page.avisoEnvio.enviarDireccion(direccion);
    });
    this.When(/^Escribo el telefono ([^"]*)$/, function(telefono) { 
        return page.avisoEnvio.enviarTelefono(telefono);
    });
    this.When(/^Selecciono el horario de ([^"]*)$/, function(horario) { 
        return page.avisoEnvio.enviarHorario(horario);
    });
    this.When(/^Selecciono un volumen de ([^"]*)$/, function(volumen) { 
        return page.avisoEnvio.enviarVolumen(volumen);
    });
    this.When(/^Subo una imagen desde ([^"]*)$/, function(url) { 
        return page.avisoEnvio.enviarImagen(url);
    });
    this.When(/^envío el formulario$/, function() { 
        return page.avisoEnvio.enviar();
    });
};