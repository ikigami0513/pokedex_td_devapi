document.addEventListener("DOMContentLoaded", async function(){
    let headers = {
        "Accept": "*/*",
    }

    var url_params = new URLSearchParams(window.location.search);
    const page = url_params.get('page') || 1;

    let response = await fetch(`http://localhost:3000/api/pokemon/all?page=${page}`, {
        method: "GET",
        headers: headers
    });

    if (!response.ok) {
        document.querySelector('#error').innerHTML = "<p>Erreur lors du chargement des pokémon.</p>";
    }
    else {
        let data = await response.json();

        data.forEach(pokemon => {
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

            document.querySelector("#table").innerHTML += `
            <div class="flex items-center justify-between px-4 py-2">
                <div class="w-1/12">${pokemon.national}</div>
                <div class="w-1/12">${pokemon.name}</div>
                <div class="w-1/12"><img class="h-12" src="http://localhost:3000/${pokemon.img_path}"/></div>
                <div class="w-1/12">${pokemon.height}</div>
                <div class="w-1/12">${pokemon.weight}</div>
                <div class="w-1/12">
                    ${types}
                </div>
                <div class="w-1/12">${pokemon.health_point}</div>
                <div class="w-1/12">${pokemon.attack}</div>
                <div class="w-1/12">${pokemon.defense}</div>
                <div class="w-1/12">${pokemon.attack_spe}</div>
                <div class="w-1/12">${pokemon.defense_spe}</div>
                <div class="w-1/12">${pokemon.speed}</div>
            </div>
            `;
        });

        if (page !== "1") {
            document.querySelector('#pagination').innerHTML += `
                <a href="http://localhost:5000/admin/pokemon?page=${parseInt(page) - 1}">
                    <button class="bg-green-900 text-white py-2 px-4 rounded-xl">Précédent</button>
                </a>
            `;
        }

        if (data.length >= 16) {
            document.querySelector('#pagination').innerHTML += `
                <a href="http://localhost:5000/admin/pokemon?page=${parseInt(page) + 1}">
                    <button class="bg-green-900 text-white py-2 px-4 rounded-xl">Suivant</button>
                </a>
            `;
        }
    }
});
