
const allCharacters = document.getElementById('characters');
const filterName = document.getElementById('search');
const filterStatus = document.getElementById('status');

// Lammado Api
async function getCharacters (name, status){

    let url = 'https://rickandmortyapi.com/api/character/';

    if (name || status){
        url += '?';
        if(name){
            url += `name=${name}&`;
        }

        if(status){
            url += `status=${status}`;
        }
    }

    const response = await fetch(url);
    const data = await response.json(); 

    return data.results;
}

async function displayCharacters (name, status) {
    
    // Personajes filtrados
    const characters = await getCharacters(name, status);
    
    allCharacters.innerHTML = '';

    // Renderizar personajes
    for( let character of characters ){
        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML = `
            <img src="${character.image}" />
            <h1> ${character.name} </h1>
            <p> ID: ${character.id} </p>
            <p> Status: ${character.status} </p>
            <p> Specie: ${character.specie} </p>
        `;

        allCharacters.appendChild(card);
        console.log(character);
    }

}

displayCharacters();

filterName.addEventListener('input', () => {
    displayCharacters(filterName.value, filterStatus.value );
});

filterStatus.addEventListener('change', () => {
    displayCharacters(filterName.value, filterStatus.value );
});


