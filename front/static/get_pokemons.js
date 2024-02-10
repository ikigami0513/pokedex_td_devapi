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

        data.forEach(async function(pokemon) {
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

            var css_class;
            if (sessionStorage.getItem('jwt')) {
                let has = await fetch(
                    `http://localhost:3000/api/user/has_pokemon?pokemon=${pokemon._id}`,{
                        headers: {
                            "Accept": "*/*",
                            "authorization": sessionStorage.getItem('jwt')
                        }
                    }
                );
                const has_data = has.json();
                if (has_data.has) {
                    css_class = "border-green-500";
                }
                else {
                    css_class = "border-red-500";
                }
            }
            else {
                css_class = "border-red-500";
            }

            document.querySelector("#table").innerHTML += `
            <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg border-b-8 ${css_class}">
                <img class="h-32" src="http://localhost:3000/${pokemon.img_path}" alt="${pokemon.name}">
                <div class="p-6">
                    <a href="http://localhost:5000/pokemon?name=${pokemon.name}">
                        <h2 class="text-xl font-semibold text-gray-800">
                            ${pokemon.national} # ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </h2>
                    </a>
                    <p class="text-gray-600 mt-2">${types}</p>
                    <div class="justify-between items-center mt-4">
                        <p class="text-gray-700">Taille: ${pokemon.height} m</p>
                        <p class="text-gray-700">Poids: ${pokemon.weight} kg</p>
                    </div>
                </div>
            </div>
            `;
        });

        if (page !== "1") {
            document.querySelector('#pagination').innerHTML += `
                <a href="http://localhost:5000/?page=${parseInt(page) - 1}">
                    <button class="bg-green-900 text-white py-2 px-4 rounded-xl">Précédent</button>
                </a>
            `;
        }

        if (data.length >= 16) {
            document.querySelector('#pagination').innerHTML += `
                <a href="http://localhost:5000/?page=${parseInt(page) + 1}">
                    <button class="bg-green-900 text-white py-2 px-4 rounded-xl">Suivant</button>
                </a>
            `;
        }
    }
});
