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
    enviarImagen: function (url) {
        if (url){
            var imageInput = page.avisoEnvio.elements.imageInput;
            return driver.findElement(imageInput).sendKeys(url)
        }
    },
    enviar: function () {
        var btnEnviar = page.avisoEnvio.elements.sendButton;
        return driver.findElement(btnEnviar).sendKeys(selenium.Key.ENTER) 
    }
};