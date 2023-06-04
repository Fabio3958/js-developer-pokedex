const pokemonPresentation = document.getElementById('presentation');
const pokemonStatistics = document.getElementById('statistics');

function convertToHtml(pokemon) {
    return `
            <div class="details">
                <div class="NameNumber">
                    <span class="pokemonName">${pokemon.name}</span>
                    <span class="pokemonNumber">#${pokemon.number}</span>
                </div>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="pokemonType ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
    `
}

function loadPokemonPresentation() {
    const urlString = window.location.href;
    const urlTratada = new URL(urlString);
    const id = urlTratada.searchParams.get("id");
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    pokeApi.getPokemonByUrl(url)
        .then((details) => {
            pokemonPresentation.innerHTML = convertToHtml(details)
                for (let i = 0; i < details.stats.length; i++) {
                    pokemonStatistics.innerHTML += `
                <li class="stat">
                    <div class="data">
                        <span>${details.stats[i]}</span>
                        <span>${details.statValues[i]}</span>
                    </div>
                    <div class="${details.stats[i]}" style="width: ${details.statValues[i]}%"></div>
                </li>`
    
                }
        })
}

loadPokemonPresentation();

