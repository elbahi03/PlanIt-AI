import { dialog_setting, affiche_projet } from "./ui.js";
import { api } from "./state.js";
import { affiche_allprojet_api } from "./crud.js"

const setting = document.querySelector("#setting");
const projet_div = document.querySelector("#projet_AI")


setting.addEventListener("click", (e) => {
    dialog_setting();
    const key_api_dialog = document.querySelector("#key_api_dialog");
    key_api_dialog.showModal();
    api();
})

affiche_projet(projet_div, affiche_allprojet_api);

projet_div.addEventListener("click", (e) => {
    console.log(e.target.classList.contains("Ouvrir"));
    if(e.target.classList.contains("Ouvrir")){
        let id = Number(e.target.dataset.id);
        window.location.href = `projetAI-details.html?id=${id}`;
    }
})