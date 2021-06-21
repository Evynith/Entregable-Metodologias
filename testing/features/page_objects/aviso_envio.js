module.exports = {
 
    url: 'https://federico-de-muguruza.github.io/tpe_metodologias/#/ofrecer-materiales',
 
    elements: {
        nameInput: by.css('#form-ar > div:nth-child(1) > input'),
        surnameInput: by.css('#form-ar > div:nth-child(2) > input'),
        addressInput: by.css('#form-ar > div:nth-child(3) > input'),
        phoneInput: by.css('#form-ar > div:nth-child(4) > input'),
        hourInput: by.css('#form-ar > div:nth-child(5)'),
        volumeInput: by.css('#form-ar > div:nth-child(6)'),
        imageInput: by.css('#form-ar > div:nth-child(7) > input'),
        sendButton: by.css('.btn-primary')
    },

    /**
     * ingresa una direccion en el input de direccion y presiona enter
     * @param {string} direccion 
     * @returns {Promise} una promesa de ingresar dato de direccion
     */
    // enviar: function (direccion) {
 
    //     var selector = page.avisoEnvio.elements.addressInput;

    //     // devuelve una promesa para que la función que la llama sepa que la tarea se ha completado
    //     return driver.findElement(selector).sendKeys(direccion, selenium.Key.ENTER);
    // }

    // enviar: function (nombre, apellido, direccion, telefono) {
 
    //     var nombreInput = page.avisoEnvio.elements.nameInput;
    //     var apellidoInput = page.avisoEnvio.elements.surnameInput;
    //     var direccionInput = page.avisoEnvio.elements.addressInput;
    //     var telefonoInput = page.avisoEnvio.elements.phoneInput;

    //     () => driver.findElement(nombreInput).sendKeys(nombre)
    //     .then(
    //         () => driver.findElement(apellidoInput).sendKeys(apellido)
    //     ).then(
    //         () => driver.findElement(direccionInput).sendKeys(direccion)
    //     ).then(
    //         () => driver.findElement(telefonoInput).sendKeys(telefono, selenium.Key.ENTER)
    //     )
    // }

    enviarNombre: function (nombre) {
        var nombreInput = page.avisoEnvio.elements.nameInput;
        return driver.findElement(nombreInput).sendKeys(nombre) 
    },
    enviarApellido: function (apellido) {
        var apellidoInput = page.avisoEnvio.elements.surnameInput;
        return driver.findElement(apellidoInput).sendKeys(apellido) 
    },
    enviarDireccion: function (direccion) {
        var direccionInput = page.avisoEnvio.elements.addressInput;
        return driver.findElement(direccionInput).sendKeys(direccion) 
    },
    enviarTelefono: function (telefono) {
        var telefonoInput = page.avisoEnvio.elements.phoneInput;
        return driver.findElement(telefonoInput).sendKeys(telefono) 
    },
    enviarHorario: function (horario) {
        var hourInput = page.avisoEnvio.elements.hourInput;
        return driver.findElement(hourInput).click().then (

        ()=> helpers.getFirstElementContainingText('#form-ar > div:nth-child(5) > select option',horario)
       
        ).then(
            (elem) => elem.click()
        )
    },
    enviarVolumen: function (volumen) {
        var volumeInput = page.avisoEnvio.elements.volumeInput;

        return driver.findElement(volumeInput).click().then (
  
        ()=> helpers.getFirstElementContainingText('#form-ar > div:nth-child(6)  > select option',volumen)
       
        ).then (
            (elem) => elem.click()
        )
    },
    enviar: function () {
        var btnEnviar = page.avisoEnvio.elements.sendButton;
        return driver.findElement(btnEnviar).sendKeys(selenium.Key.ENTER) 
    }
};