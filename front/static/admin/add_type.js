document.querySelector('#add_submit').addEventListener('click', async function(ev){
    ev.preventDefault();

    const name = document.querySelector('#name').value;
    const image = document.querySelector('#image').files[0];

    const headers = {
        "Accept": "*/*",
        "authorization": sessionStorage.getItem("jwt")
    }

    const body = JSON.stringify({
        "name": name,
        "image": image
    });

    let response = await fetch("http://localhost:3000/api/type/add", {
        method: "POST",
        body: body,
        headers: headers
    });

    if (!response.ok) {
        let data = await response.json();
        document.querySelector('#error').innerHTML = `<p>${data.message}</p>`;
    }
    else {
        window.location.href = "/admin/type";
    }
});
