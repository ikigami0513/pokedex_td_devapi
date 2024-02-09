document.addEventListener("DOMContentLoaded", async function(){
    let headers = {
        "Accept": "*/*",
    }

    let response = await fetch("http://localhost:3000/api/pokemon/all", {
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
                    <img class="w-1/2" src="http://localhost:3000/api/type/image?id=${pokemon.type1_id}"/>
                    <img class="w-1/2" src="http://localhost:3000/api/type/image?id=${pokemon.type2_id}"/>
                `;
            }

            document.querySelector("#table").innerHTML += `
            <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                <img class="h-64" src="http://localhost:3000/${pokemon.img_path}" alt="${pokemon.name}">
                <div class="p-6">
                    <h2 class="text-2xl font-semibold text-gray-800">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                    <p class="text-gray-600 mt-2 flex">${types}</p>
                    <div class="flex justify-between items-center mt-4">
                        <p class="text-gray-700">Taille: ${pokemon.height} m</p>
                        <p class="text-gray-700">Poids: ${pokemon.weight} kg</p>
                    </div>
                </div>
            </div>
            `;
        });
    }
});
