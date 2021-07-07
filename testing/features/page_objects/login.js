module.exports = {
 
    // url: 'https://federico-de-muguruza.github.io/tpe_metodologias/#/admin/login',
    url: 'http://localhost/tpe_metodologias/site/app/#/admin/login',
 
    elements: {
        usuarioInput: by.css('form > div:nth-child(1) > input'),
        contraseniaInput: by.css('form > div:nth-child(2) > input'),
        sendButton: by.css('.btn-primary')
    },
    enviarUsuario: function (usuario) {
        var usuarioInput = page.login.elements.usuarioInput;
        return driver.findElement(usuarioInput).sendKeys(usuario) 
    },
    enviarContrasenia: function (contrasenia) {
        var contraseniaInput = page.login.elements.contraseniaInput;
        return driver.findElement(contraseniaInput).sendKeys(contrasenia) 
    },
    enviar: function () {
        var sendButton = page.login.elements.sendButton;
        return driver.findElement(sendButton).sendKeys(selenium.Key.ENTER) 
    }
};