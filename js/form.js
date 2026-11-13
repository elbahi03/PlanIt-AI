// page form.js pour page new-project :
import { tab_show, btn_form, validation } from "./ui.js"

const form = document.querySelector("#form_creer");
const Retour = document.querySelector("#Retour");
const Suivant = document.querySelector("#Suivant");


var currentTab = 0;
tab_show(currentTab);


Suivant.addEventListener("click", (e) => {
    e.preventDefault();
    const valide = validation(currentTab);
    currentTab = btn_form(1, valide, currentTab, form);
});

Retour.addEventListener("click", (e) => {
    currentTab = btn_form(-1, true, currentTab, form)
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log(formData);
    const data = Object.fromEntries(formData);
    console.log(data);
    const projet = {
        nom: data.nom.trim(),
        description: data.description.trim(),
        brief: data.brief.trim(),
        duree: Math.abs(data.duree),
        nbr_dev: Math.abs(data.nbr_dev),
        technologies: data.technologies.trim().split(' '),
        niveau: data.niveau.trim()
    }



    console.log(projet);
    
})