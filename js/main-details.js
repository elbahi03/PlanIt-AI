import { getByid, gettasksDo, gettasksCours, gettasksDone, updateStatut} from "./crud.js";
import {cart_task, dragon_drop} from "./ui.js";

const param = new URLSearchParams(window.location.search);
const id = Number(param.get("id"));

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

cart_task(Do, gettasksDo, id)
cart_task(Cours, gettasksCours, id)
cart_task(Done, gettasksDone, id)


//declarer 
// let drag =null

// const cart_do = document.querySelectorAll("#Do div");
// const cart_cour = document.querySelectorAll("#Cours div");
// const cart_done = document.querySelectorAll("#Done div");

// console.log("div de do :", cart_do );

//     dragon_drop();

