module.exports = {
 
    url: 'https://federico-de-muguruza.github.io/tpe_metodologias/#/ofrecer-materiales',
 
    elements: {
        nameInput: by.css('#form-ar > div:nth-child(1) > input'),
        surnameInput: by.css('#form-ar > div:nth-child(2) > input'),
        addressInput: by.css('#form-ar > div:nth-child(3) > input'),
        phoneInput: by.css('#form-ar > div:nth-child(4) > input'),
        hourInput: by.css('#form-ar > div:nth-child(5) > input'),
        volumeInput: by.css('#form-ar > div:nth-child(6) > input'),
        imageInput: by.css('#form-ar > div:nth-child(7) > input'),
        sendButton: by.css('.btn-primary')
    },

    /**
     * ingresa una direccion en el input de direccion y presiona enter
     * @param {string} direccion 
     * @returns {Promise} una promesa de ingresar dato de direccion
     */
    enviar: function (direccion) {
 
        var selector = page.avisoEnvio.elements.addressInput;

        // devuelve una promesa para que la función que la llama sepa que la tarea se ha completado
        return driver.findElement(selector).sendKeys(direccion, selenium.Key.ENTER);
    }
};