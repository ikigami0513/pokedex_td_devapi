function imageToBase64(imagePath) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imagePath);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

document.querySelector('#add_submit').addEventListener('click', async function(ev){
    ev.preventDefault();

    const national = document.querySelector('#national').value;
    const name = document.querySelector('#name').value;
    const image = document.querySelector('#image').files[0];
    const base64_image = await imageToBase64(image);
    const height = document.querySelector('#height').value;
    const weight = document.querySelector('#weight').value;
    const type1 = document.querySelector('#type1').value;
    var type2 = document.querySelector('#type2').value;
    const health_point = document.querySelector('#health_point').value;
    const attack = document.querySelector('#attack').value;
    const defense = document.querySelector('#defense').value;
    const attack_spe = document.querySelector('#attack_spe').value;
    const defense_spe = document.querySelector('#defense_spe').value;
    const speed = document.querySelector('#speed').value;

    type2 = type2 !== "" ? type2 : null;

    const headers = {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "authorization": sessionStorage.getItem("jwt")
    };

    const body = JSON.stringify({
        "national": national,
        "name": name,
        "image": base64_image,
        "height": height,
        "weight": weight,
        "type1_id": type1,
        "type2_id": type2,
        "health_point": health_point,
        "attack": attack,
        "defense": defense,
        "attack_spe": attack_spe,
        "defense_spe": defense_spe,
        "speed": speed
    });

    let response = await fetch("http://localhost:3000/api/pokemon/add", {
        method: "POST",
        body: body,
        headers: headers
    });

    if (!response.ok) {
        let data = await response.json();
        document.querySelector('#error').innerHTML = `<p>${data.message}</p>`;
    }
    else {
        window.location.href = "/admin/pokemon";
    }
});
