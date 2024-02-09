document.addEventListener("DOMContentLoaded", async function(){
    let headers = {
        "Accept": "*/*",
        "authorization": sessionStorage.getItem("jwt")
    }

    let response = await fetch("http://localhost:3000/api/user/all", { 
        method: "GET",
        headers: headers
    });

    if (!response.ok) {
        document.querySelector('#error').innerHTML = "<p>Erreur lors du chargement des utilisateurs.</p>";
    }
    else {
        let data = await response.json();

        data.forEach(user => {
            let is_admin_icon = user.is_admin ? "&#x2713;" : "&#x2718;";

            document.querySelector("#table").innerHTML += `
            <div class="flex items-center justify-between px-4 py-2">
                <div class="w-1/4">${user._id}</div>
                <div class="w-1/4">${user.username}</div>
                <div class="w-1/4">${is_admin_icon}</div>
            </div>
            `;
        });
    }
});
