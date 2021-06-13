module.exports = {

    esperarCarga : async function(callback, ...params){
        let r = await driver.wait(
                    new Promise (async function(resolve, reject){ 
                        // Se resuelve cuando el spinner deja de existir en la página. 
                        // Falla si supera un tiempo límite
                        const ESPERA_LIMITE = 5000
                        const ESPERA_BASE = 400
                        const ESPERA_ENTRE_CHEQUEOS = 100
                        const SPINNER_SELECTOR = '.spinner-border'
                        await setTimeout(() => {}, ESPERA_BASE)
                        let contadorTiempo = ESPERA_BASE

                        //  funcion recursiva que resuelva la promesa cuando el elemento del spinner deja de existir en la página
                        let buscarSpinner = async () => { //
                            try { //"pienso luego existo"
                                await driver.findElement(by.css(SPINNER_SELECTOR)) // espera a encontrar el elemento del spinner (si no lo encuentra, tira error)
                                // console.log(`# ${contadorTiempo}ms - Sigue estando el spinner `)
                                setTimeout(buscarSpinner, ESPERA_ENTRE_CHEQUEOS)
                                contadorTiempo += ESPERA_ENTRE_CHEQUEOS
                                if (contadorTiempo > ESPERA_LIMITE) {
                                    reject(`aydante.esperarCarga: ERROR : Superó el tiempo limite de ${ESPERA_LIMITE} ms`)
                                }
                            }
                            catch (e) { // tiró error, no encontró el elemento del spinner. Se resuelve la promesa
                                // console.log(`# ${contadorTiempo}ms - Se fue el spinner `)
                                resolve(`# aydante.esperarCarga: EXITO : Se fue el spinner en ${contadorTiempo}ms`)
                            }
                        }
                        buscarSpinner()
                    })
                , 10000) 
        // console.log(r) // el mensaje que devuelve la promesa cuando resuelve (resolve()) o rechaza (reject())
        callback(...params) //spredOperator
    }





    

    
}