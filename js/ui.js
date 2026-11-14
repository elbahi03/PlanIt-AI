// page js :  de gestion tout qui est cote de UI/UX :

// function UI de dialog setting :
export function dialog_setting(){
    const dialog = document.createElement("dialog");
    const titre = document.createElement("h2");
    const form = document.createElement("form")
    const input = document.createElement("INPUT");
    const show = document.createElement("INPUT");
    const div = document.createElement("div");
    const btn_valider = document.createElement("bouton");
    const btn_annuler = document.createElement("bouton");

    dialog.id = "key_api_dialog";
    dialog.className = "flex  flex-col items-center justify-center border-solid border-[#6F41EAff] border-[1px] rounded-md m-auto h-[40%] w-[30%] bg-[#EBF3FDff]";

    titre.textContent = "Votre key :";
    titre.className = "text-[20px] text-[#6F41EAff] font-bold mb-[20px] ";
// bg-[#EBF3FDff]
    input.className = " text-[15px] border-solid border-[#6F41EAff] border-[3px] rounded-md p-2 w-[300px] mb-[3px]";
    input.type = "password";
    input.id = "key";
    input.name = "key_api";
    input.required ;
    input.value = sessionStorage.getItem("key_api") || "";
    input.placeholder = "Ecrire votre key-api";

    form.className = "flex flex-col "

    show.type = "checkbox";
    show.className = "accent-[#6F41EAff]";
    show.id = "show"

    div.className = "flex items-center justify-between mt-[20px]"

    btn_valider.className = "text-[15px] text-[#EBF3FDff] text-center bg-[#6F41EAff] h-[auto]  p-[10px] rounded-lg translate-[0.3s] w-[40%] hover:scale-[1.1]";
    btn_valider.textContent = "Valider"
    btn_valider.id = "valide"
    btn_annuler.className = "text-[15px] text-[#6F41EAff] text-center bg-[#EBF3FDff] h-[auto]  p-[10px] border-[#6F41EAff] border-[1px] rounded-lg translate-[0.3s] w-[40%] hover:scale-[1.1]";
    btn_annuler.textContent = "Annuler"
    btn_annuler.id = "annuler"

    div.appendChild(btn_valider);
    div.appendChild(btn_annuler);
    form.appendChild(input);
    form.appendChild(show);
    form.appendChild(div);
    dialog.appendChild(titre);
    dialog.appendChild(form);
    // const body = document.querySelector("body");
    document.body.appendChild(dialog);

    const key_api_dialog = document.querySelector("#key_api_dialog");
    key_api_dialog.showModal();
}


//// UI de part de formulaire :
// ui de part qui doit affiche : 
export function tab_show(n){
    const tab = document.getElementsByClassName("tab");
    const Retour =  document.querySelector("#Retour");
    const Suivant = document.querySelector("#Suivant");
    const step = document.getElementsByClassName("step");

    for(let i=0 ; i < tab.length; i++){
        tab[i].classList.toggle("hidden", i!== n);
    }

    Retour.classList.toggle("hidden", n === 0);
    if(n === tab.length - 1 ){
        Suivant.textContent = "Submit";
    }
    

    step[n].className = step[n].className.replace("opacity-[0.5]", "");

}


// part de validation de form : 
export function validation(n){
    const tab = document.getElementsByClassName("tab");
    const step = document.getElementsByClassName("step");
    const champs = tab[n].querySelectorAll("input, textarea, select");
    let valide = true;

    champs.forEach((champ) => {
        if(champ.value.trim() === ""){
            champ.classList.remove("borrder-[#6F41EAff]");
            champ.classList.add("border-[#FB708C]");
            setTimeout(() => {
                champ.classList.remove("border-[#FB708C]]");
                champ.classList.add("border-[#6F41EAff]");
            }, 4000);
            valide = false ;
        }
    })

    if(valide){
        console.log(step[n]);
        step[n].classList.remove("opacity-[0.5]");
        step[n].classList.add("opacity-[1]");
    }
    return valide ;
}

export function btn_form (n, bool, currentTab, form){
    const  tab = document.getElementsByClassName("tab");
    if (n == 1 && bool === false) return currentTab;
    let next = currentTab + n;
    if (next < 0 ) return currentTab ;
    if (next >= tab.length){
        form.requestSubmit();
        return currentTab;
    }
    tab_show(next);
    return next ;
}


// affiche les project : 

export async function affiche_projet(getAll){
    const data = await getAll() || [];
    console.log(data);
    
    const projet = document.querySelector("#projet");
    projet.textContent = ""
    if(data.length === 0){
        const p = document.createElement("p");
        p.textContent = "« Aucun projet pour le moment, créez-en un pour générer votre premier plan. »";
        p.className = "m-auto text-[15px] text-[#06255Bff]";
        projet.appendChild(p);
    }else {
        for(const element of data){
            const div = document.createElement("div");
            const titre = document.createElement("h3");
            const desc = document.createElement("p")
            const div_btn = document.createElement("div");
            const btn_open = document.createElement("button");
            const btn_delete = document.createElement("button");

            projet.className = "grid-cols-3 grid m-10 mx-40 gap-10"

            div.className = "flex flex-col justify-start items-start gap-5 border-[#6F41EAff] border-[1px]  rounded-lg p-7";

            titre.textContent = element.projectName ;
            titre.className = "text-[20px] text-[#6F41EAff] font-bold"

            desc.textContent = element.description ;
            desc.className = "text-[13px] text-[#06255Bff]"

            div_btn.className = "flex  flex-row justify-end gap-4";

            btn_open.textContent = "Ouvrir";
            btn_open.className = "text-[15px] text-[#EBF3FDff] text-center bg-[#6F41EAff] h-[auto] w-[100px] p-[10px] border-[#EBF3FDff] rounded-lg"; 

            btn_delete.textContent = "Supprimer";
            btn_delete.className = "text-[15px] text-[#6F41EAff] text-center bg-[#EBF3FDff] h-[auto] w-[100px] p-[10px]  border-[#6F41EAff] border-[1px]  rounded-lg ";

            div_btn.appendChild(btn_delete);
            div_btn.appendChild(btn_open);

            div.appendChild(titre);
            div.appendChild(desc);
            div.appendChild(div_btn);
            projet.appendChild(div);
        }
    }
}