
<!-- Please update value in the {}  -->

<h1 align="center">{Crud-Js-Assíncrono}</h1>


<div align="center">
  <h3>
    <span> | </span>
    <a href="https://github.com/Mrpv/404-Not-Found">
      Solução
    </a>
    <span> | </span>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Índice

- [Layout](#layout)
- [Tecnologias](#tecnologias)
- [Projeto](#projeto)
- [Bibliotecas](#bibliotecas)
- [Resumo](#resumo)

<!-- OVERVIEW -->

## Layout

[https://watch.screencastify.com/v/bA9S8NbgpeN9F4CEdlqv]

## Tecnologias

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [HTML5]
- [CSS3]
- [AJAX]
- [API]

## Projeto

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

O projeto foi desenvolvido durante o curso JS na web: CRUD com JavaScript assíncrono na alura, com o foco em criar uma CRUD utilizando o método fetch e os verbos HTTP. A consumir dados de uma API utilizando o método fetch e exibir no front-end.


## Bibliotecas

[json-server --watch db.json]
rodar o json server:  Para fazer a mockagem dos dados, para simular esses dados da api.

[browser-sync]
Rodar: browser-sync start --server --file . --host --port 5000 --startPath admin/telas/lista_cliente.html

## Resumo

- Vamos ter que abrir uma conexão com uma API onde estão cadastrados esses dados. Do mesmo jeito que estou conversando com vocês, é possível máquinas conversarem entre si. Para isso vamos ter que utilizar o Ajax para fazer esse meio de campo entre a nossa aplicação e a API para conseguirmos obter os dados.
- Aqui dentro vamos fazer de fato essa comunicação. Vamos precisar de alguns métodos para fazer essa comunicação e quem vai fornecer esses métodos para nós é um objeto XMLHttpRequest, ele vai ser o responsável por essa comunicação.
    
    ```jsx
    const http = new XMLHttpRequest()
    ```
    
- A primeira coisa que quero fazer é abrir a comunicação entre a minha aplicação e a API. Para isso vou utilizar o método open, então `http.open`, e aqui vou passar dois argumentos. O primeiro é o que quero falar com o servidor, então o que vou pedir para ele, e o segundo é o endereço, para onde vou enviar a minha requisição.
    
    ```jsx
    http.open('GET', 'http://localhost:3000/profile')
    
    http.send()
    ```
    
- Depois disso fazemos um `http.send`, que é para enviar essa nossa requisição. Já abrimos a comunicação e enviamos. Agora temos que vir em telas, lá em lista_cliente.html, porque temos que lembrar que temos que carregar o arquivo JavaScript para ele funcionar no html

---

- O que aconteceu na hora que carregamos a página? Nada. Então temos que indicar para o JavaScript o que vai acontecer depois que fizermos essa requisição e enviar. O que vou fazer com a resposta que o servidor vai me enviar de volta.
- Para isso vamos utilizar o método onload, ou seja, ao carregar a página. Então, `http.onload = () =>`, vou criar uma função anônima que ao carregar ele vai executar alguma coisa aqui dentro. Quero pegar o `http.response,` que é o que o servidor me devolveu, e vou imprimir lá no console de começo.
    
    ```jsx
    http.onload = () => {
        const data = http.response
        console.log(data)
    }
    ```
    
- Vamos lá no Chrome, vou atualizar a página, F12 para abrir o console. Ele deu que não conseguiu fazer a conexão com localhost:3000, isso porque localhost:3000 é um endereço que não existe. O que estamos fazendo aqui é simulando uma API, isso porque no frontend nem sempre vamos ter uma API pronta para fazermos todas as requisições.
- é muito comum simularmos dados. Vocês vão ouvir muito sobre mockar dados, para fazer simulações. Para fazer essa mockagem dos dados, para simular esses dados, vamos utilizar, se voltarmos no VisualStudio code, e viermos no package JSON, pode ver que está listado como dependência do meu projeto o JSON-server, que vai simular essa API para mim.
- Vou apertar "Ctrl + J" para abrir o terminal e dentro da pasta admin vou fazer um npm install para ele baixar as dependências do meu projeto, que no caso é o JSON server.
- Agora tenho que rodar o JSON server, para isso vou fazer um `JSON-server --watch`, porque vou pedir para ele ficar olhando um arquivo em específico, e esse arquivo é o db.json

                                                                                             npx json-server --watch db.json

- Aprendemos como fazer requisições Ajax e a exibir esses dados.

---

- O que tenho que fazer é pegar os dados da API e colocar no html. Vou criar um template que vai receber esses dados da API. Vou contar um segredo para vocês. Lá em lista_clientes.html, que está dentro da pasta de telas, dentro do `tbody`, que é o corpo da tabela, deixei um template escondido, ele está até comentado.

```jsx
<td class="td" data-td>${nome}</td>
                <td>${email}</td>
                <td>
                    <ul class="tabela__botoes-controle">
                        <li><a href="../telas/edita_cliente.html" 
                        class="botao-simples botao-simples--editar"
                        >Editar</a></li<li><button class="botao-simples 
                        botao-simples--excluir" type="button">Excluir</button></li>
                    </ul>
                </td>
```

- vou criar uma função para guardar esse template, porque vamos utilizar ele várias vezes. Vou chamar de `const criaNovaLinha = () => {.`
- Vou primeiro criar uma `const` chamada conteúdo, que vai agora sim receber tudo isso, vou até dar uma outra endentada. Para ele parar de reclamar podemos usar o template literals, que são dois acentos graves, um no começo e um lá embaixo, no final.
- Agora ele entende que isso é string e ele entende que quando tenho alguma coisa dentro das chaves que estão do lado esquerdo e cifrão, isso é JavaScript. Por que está nome e e-mail? Porque são os dados que vamos pegar da API. Ele vai receber isso como parâmetro. Então nome e e-mail
- Mas precisamos primeiro colocar, são vários clientes então temos que colocar várias linhas. Para isso vou criar a linha. Para criarmos a linha podemos utilizar o createElement, então `const linhaNovoCliente = document.createElement('tr')`. Fechou, criamos a linha, temos o conteúdo, agora temos que colocar o conteúdo dentro da linha.
- Podemos fazer isso utilizando um inner html, ele vai acessando o interior do elemento e vai colocar o conteúdo lá dentro. Podemos voltar algumas linhas e falar que `linhaNovoCliente.innerHTML = conteudo`. Agora como é uma função retorno linhaNovoCliente.

```jsx
const criaNovaLinha = (nome, email) => {
    const linhaNovoCliente = document.createElement('tr')
    const conteudo = `
        <td class="td" data-td>${nome}</td>
                <td>${email}</td>
                <td>
                    <ul class="tabela__botoes-controle">
                        <li><a href="../telas/edita_cliente.html" 
                        class="botao-simples botao-simples--editar"
                        >Editar</a></li<li><button class="botao-simples 
                        botao-simples--excluir" type="button">Excluir</button></li>
                    </ul>
                </td>
                `
    linhaNovoCliente.innerHTML = conteudo
    return linhaNovoCliente            
}
```

- se voltarmos no `lista_cliente.html`, de onde copiei o template, temos um data attributes, é ele que vamos usar como alvo quando formos percorrer todo o documento. Toda a árvore do DOM. Vamos pegar o data attributes data-tabela
- Para isso vou criar uma `const` tabela e vou percorrer a árvore do DOM utilizando `querySelector`. Aspas e colchete, e data-tabela.
- Agora tenho o elemento pai, que é o `tbody`, e tenho o elemento filho, que é a linha que acabamos de criar. Quero colocar ela dentro desse elemento pai. Para isso podemos utilizar o `appendChild`. O que vou fazer aqui é `tabela.appendChild(criaNovaLinha(nome,email))`.
- Mas cadê os dados? Os dados já vimos que vêm do data. Vou pegar essa parte da tabela `appendChild` que eu criei,  Agora temos dados no array e vamos ter que percorrer eles para pegar cada um referente a cada um dos clientes.
- Para isso vou utilizar o `forEach` para iterar sobre essa resposta. A resposta é a data, que vai conter os dados. Então, `data.forEach(elemento =>`, ou seja, para cada cliente que tenho lá, vou fazer `tabela.appendChild(criaNovaLinha(elemento.nome,elemento.email))`. Assim conseguimos pegar cada dado referente ao cliente.

```jsx
http.onload = () => {
    const data = http.response
    data.forEach(elemento => {
        tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))
    })
}
```

Se voltarmos no Chrome, vou atualizar, nada aconteceu, F12 para vermos o que está rolando. Ele está falando que “data.forEach is not a function”. Isso porque se voltarmos no VSCode temos o `http.response`, ele está devolvendo para nós texto, porque é assim que eles se comunicam. O http, o hyper text transfer protocole, então protocolo de transferência de texto.

Ele não reconhece como JavaScript válido, temos que transformar essa resposta em um objeto JavaScript para conseguirmos fazer o forEach, percorrer todo esse objeto e pegar os dados. Para isso, posso utilizar um objeto nativo do navegador chamado JSON. Ele tem um método chamado parse. Ele vai transformar o dado válido em um objeto JavaScript válido.

`JSON.parse(http.response)`

---

Encadeamos uma sequência de operações assíncronas, assim garantimos que depois que eu acabar uma operação assíncrona executo a outra.

---

### RESUMO DO Q FOI FEITO

A primeira tarefa que era exibir os dados dos clientes fizemos com sucesso. Então estamos em `cliente-service.js`, lá em cima criamos uma função chamada `criaNovaLinha`, ela recebe um template que quando pegarmos os dados na API vamos inserir esses dados no template e vamos exibir nome, e-mail e mais dois elementos, um link e um botão que vai excluir os dados dos clientes. São novas funcionalidades que vamos trabalhar mais tarde.

Para isso tivemos que percorrer a árvore do DOM, fizemos um `querySelector` buscando um data attributes, que é um data-tabela, que indica o `tbody`. Temos o `tbody` como elemento pai e a função que cria um novo elemento, que é o `tr` como filho. Para colocar o `tr` dentro do `tbody` utilizamos o appendChild.

Pegamos também os elementos que estavam na API, no caso só tinha um, fizemos uma iteração sobre eles para poder pegar cada um dos dados e exibir nos campos do `criaNovaLinha`. Deu aquele problema porque os dados vieram em forma de texto, então tivemos que usar o JSON.parse para fazer dele um elemento JavaScript válido. E assim conseguimos exibir os dados na tela.

---

a função do onload recebe essa função auxiliar. Essa função auxiliar vai ser uma função que vai ser disparada logo após uma requisição assíncrona. Essa função é chamada de call-back. 

Eles criaram um novo jeito de lidar com operações assíncronas. Eles criaram a promise. A promise, traduzindo, é uma promessa. Vou fazer uma requisição e ele vai me devolver uma promessa de que quando aquela requisição for completa ou não, vou poder fazer alguma coisa com aquela resposta que ele vai me dar.

Do mesmo jeito que instanciamos, ou inicializamos o xml, vamos precisar inicializar também a promise.

Dentro dela vamos passar dois parâmetros, o primeiro é o resolve e o segundo o reject, que vão lidar com sucesso ou erro da nossa chamada.

```jsx
const listaClinetes = () => {
    const promise = new Promise((resolve,reject) => {// precisa inicializar também a promise
        const http = new XMLHttpRequest()
        http.open('GET', 'http://localhost:3000/profile')
       
        http.onload = () => {
            if(http.status >= 400){
                reject(JSON.parse(http.response))//Lembrando que precisamos transformar essa resposta em um objeto JavaScript válido,
            }else {
                resolve(JSON.parse(http.response))
            }
        }
        http.send()
    })
   return promise //Como estamos com uma função, tem que lembrar de lá no final retornar essa promise.
}
}
```

Dentro do onload, dentro dessa função de call-back, do onload, vou passar uma verificação para saber se deu tudo ok ou não com a nossa chamada. Vou fazer uma verificação com if.

então `if(http.status >= 400)`, ou seja, 400 já é a *bad request*, a requisição que não deu certo, acima disso também tem erros, são erros relacionados a cliente servidor. Se passou de 400 não queremos, então reject, e quem ele vai rejeitar? A resposta. Então, `http.response`. Caso contrário, else, vamos fazer um resolve, passando o `http.response`.

- Agora que tivemos essa promessa que íamos receber alguma coisa, com essa promessa vamos fazer todo o trabalho de iteração para devolver de novo os dados na tela.

Lembre-se que ele devolveu a promise, então vou fazer alguma coisa. É exatamente esse o termo que vou utilizar. Temos uma propriedade chamada então, que é inglês seria then. Fizemos o ponto, então ele já sabe que automaticamente estou me referindo a `listaClientes`.

```jsx
listaClinetes()
.then( data => { //then se refere a listaClientes
        data.forEach(elemento => {
        tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))
        })
})
```

Estou fazendo a mesma coisa, pegando a resposta, iterando sobre ela, e estou exibindo na tela.

Agora estamos recebendo uma promessa, ficou muito mais organizado de trabalhar com nosso código. Chamo `listaClientes`, ele vai me devolver uma promessa, quando essa promessa for completada vou exibir os dados, pegar os dados da API, fazer o *loop* e exibir.

Com o tempo esse tipo de abordagem ficou muito comum, então acabaram se juntando esse tipo de fazer requisição, com XML e lidar com promise, e assim foi criado a fetch API.

---

A primeira missão está completa, porém podemos ainda melhorar esse código. A partir do momento que para realizarmos uma tarefa a complexidade começa a ficar um pouco alta, muita gente começa a pensar em soluções para resolver isso, e foi assim que surgiu a fetch.

Hoje utilizamos a fetch, que substitui tanto a `promise` e o http. Como vamos utilizar ela? Vou apagar tudo da `promise`, vou apagar o `get` e toda a `promise`, vou manter só o `listaClientes`. Para utilizar a fetch basta fazer um return fetch e passar o endereço, ‘[http://localhost:3000/profile’](http://localhost:3000/profile%E2%80%99).

É isso, fetch é um método global da interface da fetch API, a fetch API possui vários métodos que podemos utilizar, a fetch é um dos métodos utilizados da interface da fetch API, então aqui por padrão a fetch já faz um get, e já me devolve uma `promise`. Não precisa instanciar mais nada, simplesmente retorno a fetch.

```jsx
const listaClinetes = () => {
    return fetch(`http://localhost:3000/profile`)
  
}
```

Como ele me devolve uma `promise`, eu já vou trabalhar com essa resposta. Faço aqui um `.then`, falo que resposta e passo uma arrow function, executando resposta return, ‘return resposta `.json`’.

```jsx
const listaClinetes = () => {
    return fetch(`http://localhost:3000/profile`)
    .then( resposta => {
        return resposta.json()
    })
}
```

 Lembra que a resposta é um texto e temos que fazer `.json` para ele virar um objeto JavaScript válido.

### browser-sync

browser-sync start --server --file . --host --port 5000 --startPath /telas/lista_cliente.html 

---

foi feita a refatoração e exportação e importação de modulos.

---

E aí temos um pulo do gato, que é a web API. Muitas das coisas que fazemos hoje achamos que é JavaScript, mas na verdade é da web API. Quando faço um `document.query` estou utilizando JavaScript para acessar o web API. Quando uso `localStorage`, que é o armazenamento, estou usando o JavaScript para acessar o `localStorage`, e por aí vai.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/90d542d5-697a-43a3-8dc7-6c455dec32de/Untitled.png)

[04:00] O que for da web API vai ficar na caixa da web API, e o que for da pilha de execução, ou seja, da linguagem, vai ser executado primeiro. Quando não tiver mais nada da linguagem dentro da pilha de execução, a web API fala “então esse API de áudio está resolvido” e manda para essa fila de funções da web API.

[04:22] Aqui ficam os arquivos relacionados a web API. Temos um agente aqui que fica olhando a pilha de execução e essa fila com os arquivos da web API. Quando não tiver mais nada na pilha de execução, ele vai procurar arquivos dentro da fila de funções da web API.

[04:42] Se tiver alguma coisa aqui, ele vai puxar e jogar para a pilha de execução para ela poder executar o código. Lembra que trabalhamos com promises, certo? Também temos uma fila de promises, que é o mesmo funcionamento da fila da web API, porém o eventloop, o evento de *loop* procura primeiro na fila de promessa.

---

Nesta aula, aprendemos:

- Entender a ordem de execução do código JavaScript.
- Puxar dados do servidor utilizando a função a **fetch api** ao invés do **xmlhttprequest** para modernizar o código.
- Refatorar as responsabilidades do código pensando na manutenção da aplicação no futuro.

---

Então aqui no `fetch` ele tem o `get` automático, o `get` que é pegar alguma coisa. O que quero é postar esses dados, ou seja, vou enviar os dados que escrevi no formulário.

Para isso vou utilizar o método `post`, que vem de postar.

Além do método, preciso passar mais informações. Outra informação que preciso passar é no cabeçalho qual tipo de informação estou enviando, então no headers vou passar que estou enviando um ‘'Content-Type' : 'application/JSON’’.

```jsx
const criaCliente = () => {
    return fetch('http://localhost:3000/profile', {
        method: 'POST', //metodo post
        headers: {// qual tipo de informação estou enviando
            'Content-type' : 'application/json'
        }
		})
}
```

Outra coisa que tenho que enviar também é o nome e o e-mail, que são os dados que vou preencher no formulário. 

No corpo do formulário vou preencher esses dados, a mesma coisa no corpo da minha requisição, vou falar que é `body: {nome, e-mail`

Lembrando que comunicação cliente servidor é feita em texto. Fizemos aquela transformação com JSON.parse para pegar o texto e fazer virar um JavaScript válido. O JSON também tem outro método, que é o stringify, que faz virar texto.

```jsx
const criaCliente = (nome, email) => {
    return fetch('http://localhost:3000/profile', {
        method: 'POST', //metodo post
        headers: {// qual tipo de informação estou enviando
            'Content-type' : 'application/json'
        },
				body: JSON.stringify({
            nome: nome,
            email: email
        })
		})
}
```

falta passar os parâmetros para minha função cria cliente, que é o nome e e-mail. Vou falar que dentro do meu stringify esse nome que vier como parâmetro vai ser o nome que vou enviar no corpo da minha requisição, e o e-mail a mesma coisa. Agora, com a requisição feita, fazemos alguma coisa, então `.then( resposta => { return resposta.body`.

```jsx
const criaCliente = (nome, email) => {
    return fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then( resposta => {
        return resposta.body
    })
}
```

`criaCliente` temos que exportar porque vou utilizar ele em outro lugar.

```jsx
export const clienteService = {
    listaClientes,
    criaCliente
}
```

E agora vou colocar um evento de escuta no formulário. Ou seja, quando eu clicar no botão de cadastrar, quero que aconteça algo. Como vamos fazer isso? Vamos utilizar o método `addEventListener`. Passo o evento que quero escutar, que é o evento de submit, e depois passo outro parâmetro, que é uma função que vai executar algo assim que ele ouvir o submit.

dentro do escopo do formulário, e quando estamos lidando com eventos, o navegador disponibiliza um objeto para nós para termos mais informações sobre aquele evento.

Posso passar esse objeto como parâmetro dessa função e posso utilizar ele para fazer a busca no lugar do document. Ao invés de procurar no document inteiro, procuro exatamente onde está acontecendo o evento. Posso falar que é `evento.target.querySelector(‘[data-nome]’)`, vou copiar e trocar para data-email.

```jsx
const formulario = document.querySelector('[data-form]')
					//evento de escuta            //obejeto de evento
formulario.addEventListener('submit', (evento) => {
   const nome = evento.target.querySelector('[data-nome]').value
   const email = evento.target.querySelector('[data-email]').value
})
```

Dentro do nome percorro o formulário e pego data-nome, que é o campo do input do nome, e o valor, e e-mail, e o valor.

E agora para onde vamos enviar esses dados que pegamos? Para a função que acabamos de criar no clienteService.

                                                                          `clienteService.criaCliente(nome, email)`

Temos que lembrar de importar clienteService.

Para prevenir o comportamento de envio do formulário vou fazer um `evento.preventDefault`. Com o evento `preventDefault` eu previno o comportamento padrão do formulário, que é enviar, mesmo sem checar o que tem aqui dentro.

Agora depois que clienteService me devolver uma resposta vou usar o `.then` e vou fazer o seguinte, depois que esse cliente for cadastrado vou redirecionar a pessoa que está cadastrando o cliente para outra página, para isso vou utilizar window, que quer dizer minha tela inteira, location, que é onde estou, href, que é para onde vou enviar, vai ser igual a `../telas/cadastro_concluido.html`.

```jsx
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()//previne o comportamento padrao do formulario
    const nome = evento.target.querySelector('[data-nome]').value
    const email = evento.target.querySelector('[data-email]').value

    clienteService.criaCliente(nome, email)
    .then(() => { //redirecionar a pessoa que está cadastrando o cliente para outra página
        window.location.href = '../telas/cadastro_concluido.html'
    })
})
```

### resumo última aula

Em `clienteService` criamos uma nova comunicação. Dessa vez fizemos um método post e também vimos que foi preciso passar outras informações para essa requisição ser completada com sucesso, por exemplo, cabeçalho, que indico o tipo de conteúdo, e o corpo, que são as informações que vou passar para o servidor.

Depois criamos um arquivo novo chamado `cadastraClientesController` e percorremos o formulário, percorremos a árvore do dom, chegamos no formulário, e dentro do formulário pegamos o valor digitado do input do nome e do e-mail e passamos para o `criaCliente`.

Assim, quando a requisição for feita, ele vai escrever os dados lá no servidor. Ele redireciona usando `window.location.href`, para uma página de cadastro concluído com sucesso. Quando cliquei no botão voltei para a página, e quando carrego a página listaClientes ele faz o fetch e busca os clientes cadastrados.

---

### remove cliente

Em `clienteService`, porque novamente vamos conversar direto com o servidor. Temos lista, cria, e vou criar uma nova constante removeCliente.

É uma função arrow function e vou copiar o `return fetch`, porque é assim que vamos abrir essa conexão. Lembra que temos que passar outras informações, porque por padrão o `fetch` faz um `get`. Vou passar uma vírgula, depois do endereço, abrir e fechar chaves, e vou passar o método que vou utilizar. O método que quero utilizar é o delete. Quero deletar um cliente.

Mas não quero deletar todos os clientes. Se eu voltar na minha aplicação, no Chrome, reparem que cada linha tem um botão de excluir. Como eu identifico cada um desses clientes? Se voltarmos no VisualStudio code, vamos lá embaixo, no `db.json`, na nossa árvore de projeto, reparem que o próprio JSON service disponibiliza para nós um id.

Vamos passar um id então lá no `clienteService`, no delete, e é isso que vamos fazer. Vamos voltar no `clienteService`. E aqui, como parâmetro do `removeCliente` vou passar um id. No endereço, onde eu for bater para fazer a requisição, além do profile, vou fazer uma barra e vou passar entre chaves o id. Quer dizer, esse id tem relação com esse endereço, então esse endereço é de um cliente específico. Porém do jeito que está aqui ele não reconhece que o id é um JavaScript válido, ele vai entender isso como um texto, apesar de estar em template literals, aqui, que é o acento grave.

```jsx
const removeCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`,{
        method: 'DELETE'
    })
}
```

---

- Em `criaNovaLinha` vamos passar o id, porque a API devolve para nós o nome, o e-mail e o id que identifica cada um dos clientes. E vou colocar esse id nas trs, em cada uma das trs criadas.
- Para isso vou criar um `data attributes`. Vou fazer aqui, `linhaNovoCliente.dataset.id = id`. Então, como isso funciona? Criei um `data attributes` chamado data id e passei o id do cliente como propriedade, então esse `data-td` pode receber uma propriedade igual as três, para identificar esse data-td.

```jsx
linhaNovoCliente.dataset.id = id //coloca o id no template tr
```

- Já passamos o id para o template, conseguimos identificar cada uma das trs, quero agora deletar a linha e deletar o cliente.
- Para isso vou encontrar o elemento pai mais próximo da minha `td`, que é a `td` que tem o botão. O elemento pai mais próximo da `td` é a linha que criamos, a tr. Posso falar que `const linhaCliente = evento.target.closest(‘[data-id]’)`, do `data attributes dataid`, que é o `data attributes` da `tr`.

```jsx
tabela.addEventListener('click', (evento) => {
    let ehBotaoDeletar = evento.target.className ===
     'botao-simples botao-simples--excluir'
    if(ehBotaoDeletar){
        const linhaCliente = evento.target.closest('[data-id]')//deleta o elemento
        let id = linhaCliente.dataset.id
        clienteService.removeCliente(id) //deleta cliente da api
        .then(()=> {
            linhaCliente.remove() //para remover sem precisar fazer o reload na pagina
        })
    } 
})
```

- Repare que quando atualizamos a página ele renderizou só os que tinha na API, mas o que quero é que ele remova no momento em que eu `delete` da API. Para isso voltamos no VisualStudio code, como resposta da promise `removeCliente` posso fazer um `.then`, e executo imediatamente, falo que ‘linhaCliente.remove’, ou seja, vou remover a tr inteira.

---

## editar cliente

Para identificar a página vou fazer uma query string, ou seja, vou passar sinal de interrogação, id igual, passo chaves e coloco um id. Esqueci do cifrão para mostrar que é JavaScript.

Primeiro quero pegar aquele endereço de url, se voltarmos no Chrome quero pegar esse endereço.

- Vou gerar uma constante chamada `pegaUrl`, que vai instanciar uma url nova para mim, então new, vou usar o objeto da url, e passo como parâmetro `window.location`. Lembrando que criamos um arquivo novo, então em `editaCliente` tenho que importar `atualizaCliente-controller`.

```jsx
const pegaUrl = new URL(window.location)
```

`window.location` para ele, então ele está mostrando onde estou na tela.

Ele mostra no `href` que estou no `admin/telas/edita_cliente`, no cliente 1. O que vamos fazer com isso? Esse objeto tem um search params, ou seja, buscar por parâmetro. Está me dando uma dica.

 Se eu clicar nele, dentro de proto ele vai mostrar vários métodos que search params possui, um deles aqui é o `get`. Quero pegar. Quem eu quero pegar aqui? Quero pegar o id, o id identifica o cliente.

- vou criar uma constante chamada id e vou falar `pegaURL.searchParams.get(‘id’)`. Se eu fizer o `console.log` disso, do id, vamos lá no Chrome, vou atualizar a página, já temos o id.

```jsx
const pegaUrl = new URL(window.location)

const id = pegaUrl.searchParams.get('id')
```

- Vamos lá em `clienteService`. Vou criar uma função nova, então `const detalhaCliente`, vai ser uma arrow function, e aqui dentro vou copiar do `listaClientes`, vai ser um `return fetch`, ele vai me retornar a resposta em formato JSON.
- Vamos fazer um `get`, porém é um `get` específico, vou passar um id, e no `fetch`, no endereço passamos também `/${id}`. Agora ao invés de baixar os dados de todos os clientes vamos baixar de um cliente específico.

```jsx
const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`)
    .then( resposta => {
        return resposta.json()
    })
}
```

O que tenho que fazer agora é percorrer o DOM para pegar os campos, se voltarmos no Chrome, vamos pegar os campos nome e e-mail, para quando entrarmos na parte de edição os nomes e e-mail já virem preenchidos.

- ou chamar, criar uma constante chamada de `inputNome` e vamos buscar no DOM `document.querySelector`, pegamos a data attributes que é `data-nome`, e aqui fazemos a mesma coisa, `const inputEmail = document.querySelector(‘[data-email]’)`.

```jsx
const inputNome = document.querySelector('[data-nome]')
const inputEmail = document.querySelector('[data-email]')
```

- `clienteService.detalhaCliente(id)`, ou seja, vamos pegar o id que formos redirecionar da página. Então vou fazer `.then` e vou falar que então `dados` vai executar para mim o `inputNome.value`,o valor que formos colocar nesse campo vai ser o valor que vamos pegar da API.
- Quando chamarmos o `detalhaCliente` passando id ele vai preencher para mim nome e e-mail nos campos.
- `inputNome.value` e  `inputEmail.value` vai ser substituído pelo valores de dados.nome e email da API.

```jsx
clienteService.detalhaCliente(id)
.then(dados => {
    inputNome.value = dados.nome
    inputEmail.value = dados.email
})
```

### Editando os dados

Agora vamos ter que abrir a comunicação de novo com o servidor para editar os dados.

- Para isso vamos em `clienteService` e vamos construir outra função const `atualizaCliente`.
- Vai ser uma arrow function. E quem ele vai receber? O id, para identificar o cliente, o nome e um e-mail, como parâmetro, porque são as coisas que queremos atualizar, os dados que queremos atualizar.
- Primeiro, vai ser um return `fetch`, vou copiar do `detalhaCliente`. Retornamos a `fetch`, passamos o endereço, o id, e lembrando que agora vamos ter que passar também mais informações sobre o que vamos fazer. É parecido com o que fazemos em criaCliente.
- Quero colocar outro dado no API. Vou trocar o nome do cliente, por exemplo. Para isso vou utilizar o verbo `put`. Ele vai ser parecido, ao invés de post vai ser `put`. Aqui coloco `method: ‘PUT’`.
- Tenho que passar também no cabeçalho, indicando qual o conteúdo. Então, entre aspas `‘content-type’: ‘application/JSON’`.
- E aqui temos que passar o corpo, que é o que vamos atualizar, são os dados. Então, `body`, entre chaves o nome e e-mail. Lembrando que estamos falando em comunicação cliente e servidor, então string tem que ser o que vamos passar.
- Depois de tudo isso vamos trabalhar com a resposta, `.then( resposta`, vou falar para ele me devolver a `resposta.json`, um objeto JavaScript válido, então `return resposta.json`.

```jsx
const atualizaCliente = (id, nome, email) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT', //metodo para colocar outro dado no api
        headers: {
            'Content-type' : 'application/json' //indica qual o conteúdo
        },
        body: JSON.stringify({ // para tranformar em string
            nome: nome,
            email: email
        })
    })
    .then( resposta => {
        return resposta.json()
    })
}
```

Lembrando que `atualizaCliente` tem que ir no `clienteService`, no objeto, depois o `detalhaCliente` já existe e posso utilizar ele lá no `atualizaCliente-controller`, e é isso que vamos fazer. Vamos lá.

- Agora o que vou fazer? Primeiro tenho que procurar onde está o formulário na página.

```jsx
const formulario = document.querySelector('[data-form]')// acessa o formualrio da arvore dom
```

- Vou falar que `formulario.addEventListener`, vou passar o evento submit e a função que vou executar quando ele ouvir esse evento.
- Vou passar primeiro o objeto de evento, porque vou trabalhar com ele, para prevenir o comportamento padrão do formulário, que é enviar dados. Vou fazer `evento.preventDefault`, executei.
- Utilizar a função que acabamos de criar no `eventService`, então `clienteService`.`atualizaCliente`, e quem vai dentro desse `atualizaCliente`? O id, o nome, então `inputNome.value`, que é o valor que vamos preencher, e o `inputEmail.value`.
- quando isso for me devolver uma resposta do que aconteceu, vou fazer o seguinte, `.then`, vamos executar uma função que vai mandar uma mensagem para o usuário falando que o cliente foi cadastrado com sucesso, atualizado com sucesso. Ele vai lá para o`window.location.href` e vai mandar na tela, tem o nome do edição, então `./telas/edicao_concluida.html`

```jsx
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    clienteService.atualizaCliente(id, inputNome.value ,inputEmail.value)
    .then(() => {
        window.location.href = "../telas/edicao_concluida.html"
    })
})
```

Tudo isso é o acrônimo CRUD, que é o create, update, read e delete. Traduzindo, é listar, criar, editar e excluir. Tudo isso já estamos conseguindo fazer fazendo essa comunicação com cliente servidor.

---

## Async/Await

Uma nova sintaxe para indicar que uma função é uma função assíncrona.

- Lá em `listaClientes-controller`, na tabela. Posso falar que evento é uma função assíncrona colocando um async. E onde temos o then posso colocar um await na frente de `clienteService` e removo o `.then` daqui. O que ganhamos com isso? Ganhamos legibilidade. Eu bato o olho, sei que isso é uma função assíncrona, porém com o await ela se comporta como se fosse estruturada.

```jsx
tabela.addEventListener('click', async (evento) => {
    let ehBotaoDeletar = evento.target.className ===
     'botao-simples botao-simples--excluir'
    if(ehBotaoDeletar){
        const linhaCliente = evento.target.closest('[data-id]')//deleta o elemento
        let id = linhaCliente.dataset.id
        await clienteService.removeCliente(id) //deleta cliente da api
        linhaCliente.remove() //para remover sem precisar fazer o reload na pagina
    }
})
```

Uma função assíncrona pode conter uma expressão await, que pausa a execução da função assíncrona e espera pela resolução da promise. Depois retorna a função assíncrona e retorna o valor resolvido. Ele substitui o `.then`.

Hoje em dia é muito comum vermos async await nos códigos JavaScript para indicar justamente que o código é assíncrono e melhorar a legibilidade.

- vou criar uma função chamada render, porque o que esse trecho de código está fazendo é renderizando, apresentando dados na tela. Faço uma arrow function. Vou copiar e colar dentro da função.
- Indico que ela é assíncrona, então async, e `clienteService.listaClientes`, posso até colocar dentro de uma constante, posso chamar de `clienteService`. Recebe a execução, coloco um await, e tiro o `.data`. Apago. Ao invés do `.data` é `clienteService`, ele retorna promise e fazemos o *loop*.

```jsx
//render para renderizar
const render = async () => {
    const listaClientes = await clienteService.listaClientes()  //gera a visualização

    listaClientes.forEach(elemento => {   //loop
        tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))//add elemento depois
    })
}

render()
```

- Começando do formulário,  no submit, falo que o evento é uma função async, e em `clienteService` vamos fazer a mesma coisa. Vamos colocar um await para `clienteService` e não precisamos mais do then, porque quando ele resolver a promise ele vai me redirecionar diretamente para location, que é edição concluída html.

```jsx
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault()

    await clienteService.atualizaCliente(id, inputNome.value ,inputEmail.value)
    window.location.href = "../telas/edicao_concluida.html"
})
```

Essa função inteira posso transformar numa função auto executável. Quando ela carregar no html, ela já vai se auto executar.

`AtualizaCliente` vira uma função auto executavel.
