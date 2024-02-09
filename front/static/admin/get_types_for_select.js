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

        document.querySelector("#type2").innerHTML = `<option value=""></option>`;

        data.forEach(type => {
            document.querySelector("#type1").innerHTML += `
                <option value="${type._id}">${type.name}</option>
            `;
            document.querySelector("#type2").innerHTML += `
                <option value="${type._id}">${type.name}</option>
            `;
        });
    }
});
