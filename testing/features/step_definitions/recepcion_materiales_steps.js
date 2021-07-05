module.exports = function () {
    
    //(then del feature)
    this.Then(/^Recibo una alerta que dice ([^"]*)$/, function (respuesta) {
        // driver wait returns a promise so return that
        return driver.wait(until.elementsLocated(by.css('.alert')), 10000)
        .then(() => driver.findElement(by.css('.alert')))
        //element es de tipo webdriver
        .then((element) => element.getText())

        .then(function(innerText) {
             let validacionTexto = innerText.includes(respuesta);

            //debe dar true la condicien del assert para pasar el test
            assert(validacionTexto, 'No cumple con el mensaje esperado');
        });
    });

    this.When(/^Selecciono un tipo de usuario ([^"]*)$/, function(tipo) {

        return helpers.loadPage(page.recepcionMateriales.url)
           
        .then(function(){
            return shared.ayudante.esperarCarga(page.recepcionMateriales.seleccionarTipoUsuario, tipo);
        })
    });
    this.When(/^Si puedo, selecciono a la persona ([^"]*)$/, function(cartonero) { 
        return page.recepcionMateriales.seleccionarCartonero(cartonero);
    });
    this.When(/^Cargo los materiales$/, function() { 
        return page.recepcionMateriales.irAMateriales();
    });
    this.When(/^Selecciono el material ([^"]*)$/, function(material) {
        return page.recepcionMateriales.seleccionarMaterial(material);
    });
    this.When(/^Cargo el peso ([^"]*)$/, function(peso) { 
        return page.recepcionMateriales.enviarPeso(peso);
    });
    this.When(/^Cargo el material ([^"]*)$/, function() { 
        return page.recepcionMateriales.agregarMaterial();
    });
    this.When(/^Termino la carga de materiales ([^"]*)$/, function() { 
        return page.recepcionMateriales.terminarCargaMateriales();
    });
    this.When(/^Envío el formulario de carga ([^"]*)$/, function() { 
        return helpers.loadPage(page.recepcionMateriales.url)
           
        .then(function(){
            return shared.ayudante.esperarCarga(page.recepcionMateriales.enviarCargaCompleta);
        })
    });
};