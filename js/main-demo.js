// page main.js : lier avec page index.html 

import { dialog_setting, affiche_projet } from "./ui.js";
import { api } from "./state.js";
import { getAll} from "./crud.js"

const setting = document.querySelector("#setting");
const projet_div = document.querySelector("#projet")

affiche_projet(projet_div, getAll);

setting.addEventListener("click", (e) => {
    dialog_setting();
    const key_api_dialog = document.querySelector("#key_api_dialog");
    key_api_dialog.showModal();
    api();
})



projet_div.addEventListener("click", (e) => {
    console.log(e.target.classList.contains("Ouvrir"));
    if(e.target.classList.contains("Ouvrir")){
        let id = Number(e.target.dataset.id);
        window.location.href = `projet-demo.html?id=${id}`;
    }
})

