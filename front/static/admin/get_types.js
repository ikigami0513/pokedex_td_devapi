document.addEventListener("DOMContentLoaded", async function(){
    let headers = {
        "Accept": "*/*",
    }

    let response = await fetch("http://localhost:3000/api/type/all", {
        method: "GET",
        headers: headers
    });

    if (!response.ok) {
        document.querySelector('#error').innerHTML = "<p>Erreur lors du chargement des types.</p>";
    }
    else {
        let data = await response.json();

        data.forEach(type => {
            document.querySelector("#table").innerHTML += `
            <div class="flex items-center justify-between px-4 py-2">
                <div class="w-1/4">${type._id}</div>
                <div class="w-1/4">${type.name}</div>
                <div class="w-1/4">
                    <img src="http://localhost:3000/${type.img_path}"/>
                </div>
            </div>
            `;
        });
    }
});
