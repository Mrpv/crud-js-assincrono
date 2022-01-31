import { clienteService } from "../service/cliente-service.js"

const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement('tr')
    const conteudo = `
        <td class="td" data-td>${nome}</td>
                <td>${email}</td>
                <td>
                    <ul class="tabela__botoes-controle">
                        <li><a href="../telas/edita_cliente.html?id=${id}"
                        class="botao-simples botao-simples--editar">Editar</a></li>
                        <li><button class="botao-simples botao-simples--excluir"
                        type="button">Excluir</button></li>
                    </ul>
                </td>
                `
    linhaNovoCliente.innerHTML = conteudo
    linhaNovoCliente.dataset.id = id //coloca o id no template tr
    return linhaNovoCliente            
}

const tabela = document.querySelector('[data-tabela]')

//para deletar o cliente
tabela.addEventListener('click', async (evento) => {
    let ehBotaoDeletar = evento.target.className ===
     'botao-simples botao-simples--excluir'
    if(ehBotaoDeletar){
        try{
            const linhaCliente = evento.target.closest('[data-id]')//deleta o elemento
            let id = linhaCliente.dataset.id
            await clienteService.removeCliente(id) //deleta cliente da api
            linhaCliente.remove() //para remover sem precisar fazer o reload na pagina
        }
        catch(erro){
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    }
})

//render para renderizar
const render = async () => {
    try {
        const listaClientes = await clienteService.listaClientes()  //gera a visualização
        listaClientes.forEach(elemento => {   //loop
        tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))//add elemento depois
        })
    }
    catch(erro){
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }

}
render()
