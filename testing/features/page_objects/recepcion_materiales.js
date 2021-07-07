module.exports = {
 
    // url: 'https://federico-de-muguruza.github.io/tpe_metodologias/#/admin/registro-ingreso',
    // url2: 'https://federico-de-muguruza.github.io/tpe_metodologias/#/admin/registro-ingreso/materiales',

    url: 'http://localhost/tpe_metodologias/site/app/#/admin/registro-ingreso',
    url2: 'http://localhost/tpe_metodologias/site/app/#/admin/registro-ingreso/materiales',
 
    elements: {
        tipoUsuarioSelect: by.css('#form-ar > div:nth-child(1) > select'),
        cartoneroSelect: by.css('#form-ar > div:nth-child(2) > select'),
        materialesButton: by.id('btn-addMateriales'),
        materialSelect: by.css('#selectMaterialUnidad'),
        pesoInput: by.css('#inputMaterialUnidad'),
        addButton: by.css('button.btn-outline-primary'),
        volverButton: by.css('button.btn-primary'),
        sendButton: by.css('.btn-primary')
    },

    seleccionarTipoUsuario: function (tipo) {
        var tipoUsuarioSelect = page.recepcionMateriales.elements.tipoUsuarioSelect;
        return driver.findElement(tipoUsuarioSelect).click().then (
            ()=> helpers.getFirstElementContainingText('#form-ar > div:nth-child(1) > select option',tipo)
        ).then(
            (elem) => elem.click()
        )
        // .then(
        //     // ()=> shared.ayudante.esperarValor('#selectTipoUsuario', tipo)
        //     ()=> driver.wait(helpers.waitUntilAttributeEquals('#selectTipoUsuario', 'value', tipo, 10000))
        // )
    },
    seleccionarCartonero: function (cartonero) {
        if (cartonero) {
            var  cartoneroSelect = page.recepcionMateriales.elements. cartoneroSelect;
            return driver.findElement(cartoneroSelect).click().then (
                ()=> helpers.getFirstElementContainingText('#form-ar > div:nth-child(2) > select option',cartonero)
            ).then(
                (elem) => elem.click()
            )
            // .then(
            //     // function() {
            //     //     if(cartonero) {
            //     //         return helpers.waitUntilAttributeEquals('#selectCartonero', 'value', cartonero, 10000)
            //     //     } 
            //     //     // else {
            //     //     //     return helpers.waitUntilAttributeEquals('#selectCartonero', 'value', "", 10000)
            //     //     // }
            //     // } 
            //     ()=> driver.wait( helpers.waitUntilAttributeEquals('#selectCartonero', 'value', cartonero, 10000))
            // )
        }
    },
    irAMateriales: function (tipo) {
        var materialesButton = page.recepcionMateriales.elements.materialesButton;
        // var materialSelect = page.recepcionMateriales.elements.materialSelect;

        return helpers.waitUntilAttributeEquals('#selectTipoUsuario', 'value', tipo, 10000)
        .then (
                ()=> driver.findElement(materialesButton)
        )
        .then(
            (elem) => elem.click()
        ).then(
            ()=> driver.wait(until.urlContains( page.recepcionMateriales.elements.url2 ) )
        )
        //loadpage carga la pagina que se le indica
        // .then(
        //     ()=> helpers.loadPage(page.recepcionMateriales.url2)
        // )
        // .then(
        //     ()=> until.elementsLocated(by.css(materialSelect))
        //     // ()=> driver.wait(until.elementLocated(By.id('selectMaterialUnidad')))
        // )
    },
    seleccionarMaterial: function (material) {
        var materialSelect = page.recepcionMateriales.elements.materialSelect;
        return driver.wait(until.elementLocated('#selectMaterialUnidad'))
        .then (
            ()=> driver.findElement(materialSelect).click()
        )
        .then (
            // ()=> helpers.selectByVisibleText('#form-ar > div:nth-child(1) > select option',material).click()
            ()=> helpers.getFirstElementContainingText('#form-ar > div:nth-child(1) > select option',material)
        )
            // ).then(
        //     (elem) => elem.click()
        // )
    },
    enviarPeso: function (peso) {
        var pesoInput = page.recepcionMateriales.elements.pesoInput;
        return driver.findElement(pesoInput).sendKeys(peso) 
    },
    agregarMaterial: function () {
        var addButton = page.recepcionMateriales.elements.addButton;
        return driver.findElement(addButton).sendKeys(selenium.Key.ENTER) 
    },
    terminarCargaMateriales: function () {
        var volverButton = page.recepcionMateriales.elements.volverButton;
        return driver.findElement(volverButton).sendKeys(selenium.Key.ENTER) 
    },
    enviarCargaCompleta: function () {
        var sendButton = page.recepcionMateriales.elements.sendButton;
        return driver.findElement(sendButton).sendKeys(selenium.Key.ENTER) 
    }
};