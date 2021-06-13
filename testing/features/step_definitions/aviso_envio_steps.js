// const { until } = require("async");
module.exports = function () {
    
    //(then del feature)
    this.Then(/^Recibo una notificación de falta de datos$/, function () {
 
        // driver wait returns a promise so return that
        return driver.wait(until.elementsLocated(by.css('.modal-body > p')), 10000)
        .then(() => driver.findElement(by.css('.modal-body > p')))
        //element es de tipo webdriver
        .then((element) => element.getText())

        .then(function(innerText) {
             let validacionTexto = innerText.includes("Faltan ingresar datos");

            //debe dar true la condicien del assert para pasar el test
            assert(validacionTexto, 'No cumple con el mensaje esperado');
        });
    });
    //pasos de page-objects (when del feature)
    this.When(/^Escribo la dirección "([^"]*)"$/, function (direccion) {
 
        return helpers.loadPage('https://federico-de-muguruza.github.io/tpe_metodologias/#/ofrecer-materiales')
             
        .then(function(){
 
            // setTimeout( function(){
            // usa un método en el objeto de la página que también devuelve una promesa
            // return page.avisoEnvio.enviar(direccion);
            // }, 3000);

            return shared.ayudante.esperarCarga(page.avisoEnvio.enviar, direccion);

        })
    });
};