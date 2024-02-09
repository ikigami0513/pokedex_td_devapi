document.addEventListener("DOMContentLoaded", async function(){
    const jwt = sessionStorage.getItem("jwt");

    if (jwt) {
        const headers = {
            "Accept": "*/*",
            "authorization": jwt
        }

        let response = await fetch(
            "http://localhost:3000/api/user/get", {
                method: "GET",
                headers: headers
            }
        );

        if (!response.ok) {
            not_logged();
        }
        else {
            let data = await response.json()

            if (data.is_admin) {
                document.querySelector('#submenu').innerHTML += `
                    <a href="/admin" class="text-white hover:text-gray-300">
                        Administration
                    </a>
                `;
            }

            document.querySelector('#submenu').innerHTML += `
                    <a id="logout" class="text-white hover:text-gray-300">
                        Déconnexion
                    </a>
                    <a href="#" class="text-white hover:text-gray-300 flex justify-center items-center">
                        ${data.username.charAt(0).toUpperCase() + data.username.slice(1)}
                        <svg xmlns="http://www.w3.org/2000/svg" class="text-white h-7 w-7 my-3.5 ml-2 mr-3 xl:mr-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                        </svg>
                    </a>
            `;
            document.querySelector('#logout').addEventListener('click', function(){
                logout();
            });
        }
    }
    else {
        not_logged();
    }
});

function not_logged() {
    document.querySelector('#submenu').innerHTML += `
        <a href="/login" class="text-white hover:text-gray-300">Connexion</a>
        <a href="/register" class="text-white hover:text-gray-300">Inscription</a>
    `;
}

function logout() {
    sessionStorage.removeItem('jwt');
    window.location.href = '/';
}