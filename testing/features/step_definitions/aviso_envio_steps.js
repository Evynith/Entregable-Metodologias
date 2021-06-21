// const { until } = require("async");
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
    //pasos de page-objects (when del feature)
    // this.When(/^Escribo la dirección ([^"]*)$/, function (direccion) {

    //     return helpers.loadPage('https://federico-de-muguruza.github.io/tpe_metodologias/#/ofrecer-materiales')
             
    //     .then(function(){
 
    //         // setTimeout( function(){
    //         // usa un método en el objeto de la página que también devuelve una promesa
    //         // return page.avisoEnvio.enviar(direccion);
    //         // }, 3000);

    //         return shared.ayudante.esperarCarga(page.avisoEnvio.enviar, direccion);

    //     })
    // });

    // this.When(/^Escribo el nombre ([^"]*), Escribo el apellido ([^"]*), Escribo la dirección ([^"]*), Escribo el telefono ([^"]*)$/, function (nombre, apellido, direccion, telefono) {

    //     return helpers.loadPage('https://federico-de-muguruza.github.io/tpe_metodologias/#/ofrecer-materiales')
             
    //     .then(function(){
 
    //         // setTimeout( function(){
    //         // usa un método en el objeto de la página que también devuelve una promesa
    //         // return page.avisoEnvio.enviar(direccion);
    //         // }, 3000);

    //         return shared.ayudante.esperarCarga(page.avisoEnvio.enviar, nombre, apellido, direccion, telefono);

    //     })
    // });

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
    this.When(/^envío el formulario$/, function() { 
        return page.avisoEnvio.enviar();
    });
};