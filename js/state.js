// management API , seccion storage ...

export function api() {
    const valide = document.querySelector("#valide");
    const annuler = document.querySelector("#annuler");
    const input = document.querySelector("#key");
    const key_api_dialog = document.querySelector("#key_api_dialog");
    valide.addEventListener("click", (e) => {
        // e.defaultPrevented();
        let keyy = input.value;
        if (keyy.length != 0) {
            sessionStorage.setItem("key_api", keyy);
            console.log("voila : ", sessionStorage.getItem("key_api"));  
            key_api_dialog.remove();
        } else {
            const p = document.createElement("p");
            p.textContent = "remplir le key Api";
            p.className = "text-500-red m-auto"
            const form = document.querySelector("form");
            form.appendChild(p);
            setTimeout(() => {
                p.remove();
            }, 4000);
        }
    })

    annuler.addEventListener("click", (e) => {
        key_api_dialog.remove();
    })
}