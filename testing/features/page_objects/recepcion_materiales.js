module.exports = {
 
    url: 'https://federico-de-muguruza.github.io/tpe_metodologias/#/admin/registro-ingreso',
    url2: 'https://federico-de-muguruza.github.io/tpe_metodologias/#/admin/registro-ingreso/materiales',
 
    elements: {
        tipoUsuarioSelect: by.css('#form-ar > div:nth-child(1) > select'),
        cartoneroSelect: by.css('#form-ar > div:nth-child(2) > select'),
        materialesButton: by.css('#form-ar > div.card'),
        materialSelect: by.css('div.card-body > div:nth-child(1) > select'),
        pesoInput: by.css('div.card-body > div:nth-child(2) > input'),
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
    },
    seleccionarCartonero: function (cartonero) {
        if (cartonero) {
            var  cartoneroSelect = page.recepcionMateriales.elements. cartoneroSelect;
            return driver.findElement( cartoneroSelect).click().then (
                ()=> helpers.getFirstElementContainingText('#form-ar > div:nth-child(2) > select option',cartonero)
            ).then(
                (elem) => elem.click()
            )
        }
    },
    irAMateriales: function () {
        var materialesButton = page.recepcionMateriales.elements.materialesButton;
        return driver.findElement(materialesButton).sendKeys(selenium.Key.ENTER).then(
            ()=> helpers.loadPage(page.recepcionMateriales.url2)
        ). then (
            ()=> driver.wait(until.elementsLocated(by.css('#form-ar')), 10000)
        )
    },
    seleccionarMaterial: function (material) {
        var materialSelect = page.recepcionMateriales.elements.materialSelect;
        return driver.findElement(materialSelect).click().then (
            ()=> helpers.getFirstElementContainingText('#form-ar > div:nth-child(1) > select option',material)
        ).then(
            (elem) => elem.click()
        )
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