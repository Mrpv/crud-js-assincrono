import { clienteService } from "../service/cliente-service.js"

(async ()=> {
    const pegaUrl = new URL(window.location)

    const id = pegaUrl.searchParams.get('id') //para pegar o id da url

    const inputNome = document.querySelector('[data-nome]')
    const inputEmail = document.querySelector('[data-email]')

    try {
        const dados = await clienteService.detalhaCliente(id)
        inputNome.value = dados.nome    //jogar os dados da api nos campos de valores
        inputEmail.value = dados.email //jogar os dados da api nos campos de valores  
    }
    catch(erro){
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }
    


    const formulario = document.querySelector('[data-form]')// acessa o formualrio da arvore dom

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault()
        try {
            await clienteService.atualizaCliente(id, inputNome.value ,inputEmail.value)
            window.location.href = "../telas/edicao_concluida.html"
        }
        catch(erro){
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    })

})()
