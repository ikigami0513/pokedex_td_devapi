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
            window.location.href = "/";
        }
        else {
            const data = await response.json();
            if (!data.is_admin) {
                window.location.href = "/";
            }
        }
    }
    else {
        window.location.href = "/";
    }
});
