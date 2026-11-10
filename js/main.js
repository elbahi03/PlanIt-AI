import { dialog_setting } from "./ui.js";
import { api } from "./state.js"

const setting = document.querySelector("#setting");

setting.addEventListener("click", (e) => {
    dialog_setting();
    const key_api_dialog = document.querySelector("#key_api_dialog");
    key_api_dialog.showModal();
    api();
})