document.querySelector('#login_submit').addEventListener('click', async function(ev){
    ev.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const headers = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    const body = JSON.stringify({
        "username": username,
        "password": password
    });

    let response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        body: body,
        headers: headers
    });

    if (!response.ok) {
        let data = await response.json();
        document.querySelector('#error').innerHTML = `<p>${data.message}</p>`;
    }
    else {
        let data = await response.json();
        sessionStorage.setItem('jwt', data.token);
        window.location.href = "/";
    }
});
