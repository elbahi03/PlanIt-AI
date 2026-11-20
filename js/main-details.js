import { getByid, gettasksDo, gettasksCours, gettasksDone, updateStatut} from "./crud.js";
import {cart_task, dragon_drop} from "./ui.js";
import { dialog_setting, affiche_projet } from "./ui.js";
import { api } from "./state.js";


const param = new URLSearchParams(window.location.search);
const id = Number(param.get("id"));
const setting = document.querySelector("#setting");


console.log(id);

const data_id = await getByid(id);
console.log(data_id);

console.log(await gettasksDo(id));

const name_projet = document.querySelector("#name_projet");
const p_desc = document.querySelector("#p_desc");

name_projet.textContent = data_id.projectName + ".";
p_desc.textContent = data_id.description + ".";

const Do = document.querySelector("#Do");
const Cours = document.querySelector("#Cours");
const Done = document.querySelector("#Done");

cart_task(Do, gettasksDo, id, updateStatut)
cart_task(Cours, gettasksCours, id, updateStatut)
cart_task(Done, gettasksDone, id, updateStatut)


//declarer 
// let drag =null

// const cart_do = document.querySelectorAll("#Do div");
// const cart_cour = document.querySelectorAll("#Cours div");
// const cart_done = document.querySelectorAll("#Done div");

// console.log("div de do :", cart_do );

//     dragon_drop();

setting.addEventListener("click", (e) => {
    dialog_setting();
    const key_api_dialog = document.querySelector("#key_api_dialog");
    key_api_dialog.showModal();
    api();
})