// page main.js : lier avec page index.html 

import { dialog_setting, affiche_projet } from "./ui.js";
import { api } from "./state.js";
import { getAll } from "./crud.js"

const setting = document.querySelector("#setting");

getAll();
affiche_projet(getAll);

setting.addEventListener("click", (e) => {
    dialog_setting();
    const key_api_dialog = document.querySelector("#key_api_dialog");
    key_api_dialog.showModal();
    api();
})

