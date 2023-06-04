const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <a href="/details.html?id=${pokemon.number}">
            <li id="${pokemon.number} "class="pokemon ${pokemon.type}">
                <span id="${pokemon.number}" class="number">#${pokemon.number}</span>
                <span id="${pokemon.number}" class="name">${pokemon.name}</span>

                <div id="${pokemon.number}" class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li id="${pokemon.number}" class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img id="${pokemon.number}" src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        </a>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})