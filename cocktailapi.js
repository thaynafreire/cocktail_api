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

    // add os elementos criados dentro do card
    cardElement.appendChild(titleElement)
    cardElement.appendChild(imgElement) 

    // add o card todo dentro do container na página
    cardContainer.appendChild(cardElement)
}

async function preencherDrinks() {
    const nome = document.getElementById('texto').value 
    const coqueteis = await pesquisarFotosDrink(nome) 
    const cardContainer = document.getElementById('card-container') 

    cardContainer.replaceChildren() 
    coqueteis.forEach(criarCardDrink) // Para cada drink encontrado, cria um card e o exibe na tela

}


document.getElementById('pesquisar')
        .addEventListener('click', preencherDrinks)