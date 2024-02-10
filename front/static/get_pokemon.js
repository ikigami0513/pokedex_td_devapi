document.addEventListener('DOMContentLoaded', async function(){
    let headers = {
        "Accept": "*/*",
    }

    var url_params = new URLSearchParams(window.location.search);
    const name = url_params.get('name');

    let response = await fetch(`http://localhost:3000/api/pokemon/pokemon?pokemon=name:${name}`, {
        method: "GET",
        headers: headers
    });

    if (!response.ok) {
        document.querySelector('#error').innerHTML = "<p>Erreur lors du chargement du pokémon.</p>";
    }
    else {
        const pokemon = await response.json();

        document.querySelector('#name').innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        document.querySelector('#national').innerHTML = `#${pokemon.national}`;
        document.querySelector('#image').src = `http://localhost:3000/${pokemon.img_path}`;

        var types;
        if ( pokemon.type2_id === null) {
            types = `
                <img class="w-3/4" src="http://localhost:3000/api/type/image?id=${pokemon.type1_id}"/>
            `;
        }
        else {
            types = `
                <img class="w-3/4" src="http://localhost:3000/api/type/image?id=${pokemon.type1_id}"/>
                <img class="w-3/4" src="http://localhost:3000/api/type/image?id=${pokemon.type2_id}"/>
            `;
        }
        document.querySelector('#type').innerHTML = types;

        document.querySelector('#height').innerHTML = `${pokemon.height}m`;
        document.querySelector('#weight').innerHTML = `${pokemon.weight}kg`;

        document.querySelector('#stats').innerHTML = `
            <li class="pl-4">Point de vie: ${pokemon.health_point}</li>
            <li class="pl-4">Attaque: ${pokemon.attack}</li>
            <li class="pl-4">Défense: ${pokemon.defense}</li>
            <li class="pl-4">Attaque Spéciale: ${pokemon.attack_spe}</li>
            <li class="pl-4">Défense Spéciale: ${pokemon.defense_spe}</li>
            <li class="pl-4">Vitesse: ${pokemon.speed}</li>
        `;
    }
});
