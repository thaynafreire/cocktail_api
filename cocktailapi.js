'use strict'

async function pesquisarFotosDrink(nome){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`
    const response = await fetch(url)
    const data = await response.json()

    return data.drinks
}

function criarCardDrink(drink){
    const cardContainer = document.getElementById('card-container')
    const cardElement = document.createElement('div') 
    cardElement.classList.add('card')

    const titleElement = document.createElement('h3') // criando um h3 para o nome do drink
    titleElement.textContent = drink.strDrink // definindo o nome do drink como texto do <h3>

    const imgElement = document.createElement('img') 
    imgElement.src = drink.strDrinkThumb // definindo o caminho da imagem
    imgElement.alt = drink.strDrink // adicionando um texto alternativo para acessibilidade da imagem 

    // adiciona a funcionalidade de clicar no card
    cardElement.addEventListener('click', () => exibirDetalhesDrink(drink));

    // add os elementos criados dentro do card
    cardElement.appendChild(titleElement)
    cardElement.appendChild(imgElement) 

    // add o card todo dentro do container na página
    cardContainer.appendChild(cardElement)
}

function exibirDetalhesDrink(drink) {
    // esconde o contêiner de cards
    const containerCards = document.getElementById('card-container')
    containerCards.classList.add('hidden')

    // esconde a barra de pesquisa e diminui o header
    const barraPesquisa = document.getElementById('barra_pesquisa_header')
    barraPesquisa.classList.add('hidden')

    // pega o elemento onde os detalhes do drink serão exibidos
    const detalhesDrink = document.getElementById('drink-details')
    detalhesDrink.innerHTML = '' // limpa o conteúdo anterior de detalhes
    detalhesDrink.classList.remove('hidden') // exibe o contêiner de detalhes

    // cria o painel esquerdo que vai conter o nome e a imagem do drink
    const painelEsquerdo = document.createElement('div')
    painelEsquerdo.id = 'painel-esquerdo'

    // cria o elemento de título (nome do drink)
    const nomeDrink = document.createElement('h2')
    nomeDrink.textContent = drink.strDrink // define o nome do drink como texto do título

    // cria o elemento de imagem do drink
    const imagemDrink = document.createElement('img')
    imagemDrink.src = drink.strDrinkThumb // define o caminho da imagem

    // adiciona o nome e a imagem ao painel esquerdo
    painelEsquerdo.appendChild(nomeDrink)
    painelEsquerdo.appendChild(imagemDrink)

    // cria o painel direito que vai conter os ingredientes
    const painelDireito = document.createElement('div')
    painelDireito.id = 'painel-direito'

    // cria o título "ingredientes"
    const tituloIngredientes = document.createElement('h2')
    tituloIngredientes.textContent = 'Ingredientes'

    // cria o contêiner onde os ingredientes serão listados
    const listaIngredientes = document.createElement('div')
    listaIngredientes.id = 'lista-de-ingredientes'

    // inicia o loop para pegar os ingredientes do drink
    for (let indice = 1; ; indice++) {
        // pega o ingrediente correspondente ao índice atual
        const ingrediente = drink[`strIngredient${indice}`]

        if (!ingrediente) break 

        // cria um item para o ingrediente
        const itemIngrediente = document.createElement('div')

        // cria a URL da imagem do ingrediente
        const imagemIngrediente = `https://www.thecocktaildb.com/images/ingredients/${ingrediente.toLowerCase()}-medium.png`
        
        // cria a imagem do ingrediente
        const imagemItemIngrediente = document.createElement('img')
        imagemItemIngrediente.src = imagemIngrediente // define o caminho da imagem do ingrediente
        imagemItemIngrediente.alt = ingrediente // texto alternativo para acessibilidade
    
        // cria o nome do ingrediente
        const nomeItemIngrediente = document.createElement('div')
        nomeItemIngrediente.textContent = ingrediente
    
        // adiciona a imagem e o nome ao item de ingrediente
        itemIngrediente.appendChild(imagemItemIngrediente)
        itemIngrediente.appendChild(nomeItemIngrediente)
    
        // adiciona o item de ingrediente à lista de ingredientes
        listaIngredientes.appendChild(itemIngrediente)
    }

    // adiciona o título e a lista de ingredientes ao painel direito
    painelDireito.appendChild(tituloIngredientes)
    painelDireito.appendChild(listaIngredientes)

    // adiciona os dois painéis (esquerdo e direito) ao contêiner de detalhes
    detalhesDrink.appendChild(painelEsquerdo)
    detalhesDrink.appendChild(painelDireito)
}


async function preencherDrinks() {
    const nome = document.getElementById('texto').value 
    const coqueteis = await pesquisarFotosDrink(nome) 
    const cardContainer = document.getElementById('card-container') 

    cardContainer.replaceChildren() 
    coqueteis.forEach(criarCardDrink) // para cada drink encontrado, cria um card e o exibe na tela

}


document.getElementById('pesquisar')
        .addEventListener('click', preencherDrinks)