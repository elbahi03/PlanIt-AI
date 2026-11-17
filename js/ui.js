// page js :  de gestion tout qui est cote de UI/UX :
import { updateStatut } from "./crud.js";

// function UI de dialog setting :
export function dialog_setting() {
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
    input.required;
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
export function tab_show(n) {
    const tab = document.getElementsByClassName("tab");
    const Retour = document.querySelector("#Retour");
    const Suivant = document.querySelector("#Suivant");
    const step = document.getElementsByClassName("step");

    for (let i = 0; i < tab.length; i++) {
        tab[i].classList.toggle("hidden", i !== n);
    }

    Retour.classList.toggle("hidden", n === 0);
    if (n === tab.length - 1) {
        Suivant.textContent = "Submit";
    }


    step[n].className = step[n].className.replace("opacity-[0.5]", "");

}


// part de validation de form : 
export function validation(n) {
    const tab = document.getElementsByClassName("tab");
    const step = document.getElementsByClassName("step");
    const champs = tab[n].querySelectorAll("input, textarea, select");
    let valide = true;

    champs.forEach((champ) => {
        if (champ.value.trim() === "") {
            champ.classList.remove("borrder-[#6F41EAff]");
            champ.classList.add("border-[#FB708C]");
            setTimeout(() => {
                champ.classList.remove("border-[#FB708C]]");
                champ.classList.add("border-[#6F41EAff]");
            }, 4000);
            valide = false;
        }
    })

    if (valide) {
        console.log(step[n]);
        step[n].classList.remove("opacity-[0.5]");
        step[n].classList.add("opacity-[1]");
    }
    return valide;
}

export function btn_form(n, bool, currentTab, form) {
    const tab = document.getElementsByClassName("tab");
    if (n == 1 && bool === false) return currentTab;
    let next = currentTab + n;
    if (next < 0) return currentTab;
    if (next >= tab.length) {
        form.requestSubmit();
        return currentTab;
    }
    tab_show(next);
    return next;
}


// affiche les project : 

export async function affiche_projet(getAll) {
    const data = await getAll() || [];
    console.log(data);

    const projet = document.querySelector("#projet");
    projet.textContent = ""
    if (data.length === 0) {
        const p = document.createElement("p");
        p.textContent = "« Aucun projet pour le moment, créez-en un pour générer votre premier plan. »";
        p.className = "m-auto text-[15px] text-[#06255Bff]";
        projet.appendChild(p);
    } else {
        for (const element of data) {
            const div = document.createElement("div");
            const titre = document.createElement("h3");
            const desc = document.createElement("p")
            const div_btn = document.createElement("div");
            const btn_open = document.createElement("button");
            const btn_delete = document.createElement("button");

            projet.className = "grid-cols-3 grid m-10 mx-40 gap-10"

            div.className = "flex flex-col justify-start items-start gap-5 border-[#6F41EAff] border-[1px]  rounded-lg p-7";

            titre.textContent = element.projectName;
            titre.className = "text-[20px] text-[#6F41EAff] font-bold"

            desc.textContent = element.description;
            desc.className = "text-[13px] text-[#06255Bff]"

            div_btn.className = "flex  flex-row justify-end gap-4";

            btn_open.textContent = "Ouvrir";
            btn_open.dataset.id = `${element.id}`;
            btn_open.className = "Ouvrir text-[15px] text-[#EBF3FDff] text-center bg-[#6F41EAff] h-[auto] w-[100px] p-[10px] border-[#EBF3FDff] rounded-lg";

            btn_delete.textContent = "Supprimer";
            btn_delete.dataset.id = `${element.id}`;
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

export async function cart_task(parent, filtrage, id) {
    const tasks = await filtrage(id);
    for (const task of tasks) {
        const div_parent = document.createElement("div");
        const div_head = document.createElement("div");
        const div_titre = document.createElement("div")
        const div_footer = document.createElement("div");
        const titre_task = document.createElement("h2");
        const id_task = document.createElement("p");
        const details_task = document.createElement("details");
        const desc_task = document.createElement("p");
        const priority_task = document.createElement("p");
        const importance_task = document.createElement("p");
        const size_task = document.createElement("p");
        const deadline_task = document.createElement("p");

        div_parent.className = "cart flex flex-col justify-start items-start p-5 w-full gap-5 border-[#6F41EAff] border-1 rounded-lg";
        div_parent.draggable = true;
        div_parent.dataset.id = task.id;

        div_head.className = "flex justify-between"
        div_titre.className = "flex gap-1"

        titre_task.textContent = task.title;
        titre_task.className = "w-[250px] text-[15px] text-[#6F41EAff]";
        id_task.textContent = task.id;
        id_task.className = "text-[7px] text-[#6F41EAff] opacity-50";

        div_titre.appendChild(titre_task);
        div_titre.appendChild(id_task);

        details_task.open = false;
        const summary = document.createElement("summary");
        summary.innerHTML = `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style="width: 16px; height: 16px; color: rgb(111, 65, 234);" stroke="#6F41EAff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <g clip-path="url(#clip0_429_11122)">
                                <rect x="12" y="12" width="0.01" height="0.01" stroke="#6F41EAff" stroke-width="3.75"
                                    stroke-linejoin="round"></rect>
                                <rect x="12" y="5" width="0.01" height="0.01" stroke="#6F41EAff" stroke-width="3.75"
                                    stroke-linejoin="round"></rect>
                                <rect x="12" y="19" width="0.01" height="0.01" stroke="#6F41EAff" stroke-width="3.75"
                                    stroke-linejoin="round"></rect>
                            </g>
                            <defs>
                                <clipPath id="clip0_429_11122">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)">
                                    </rect>
                                </clipPath>
                            </defs>
                        </g>
                    </svg>`;
        summary.className = "sticky  cursor-pointer list-none [&::-webkit-details-marker]:hidden";
        const div_content = document.createElement("div");
        const btn_modifier = document.createElement("button");
        const btn_supprimer = document.createElement("button");

        div_content.className = "flex flex-col absolute z-1 bg-[#B4C9F3ff] gap-10 ml-[-100px] mt-[10px] p-5 border-[#6F41EAff] border-1 rounded-lg"
        btn_modifier.textContent = "modifier";
        btn_supprimer.textContent = "supprimer";

        div_content.appendChild(btn_modifier);
        div_content.appendChild(btn_supprimer)
        details_task.appendChild(summary);
        details_task.appendChild(div_content);
        div_head.appendChild(div_titre);
        div_head.appendChild(details_task);
        div_parent.appendChild(div_head);

        desc_task.textContent = task.description;
        desc_task.className = "text-[13px] text-[#06255Bff]";
        div_parent.appendChild(desc_task);

        priority_task.textContent = task.priority;
        priority_task.className = "text-[10px] text-[#06255Bff] rounded-lg p-2"

        if (task.priority === "Low") {
            priority_task.classList.add("bg-[#16A34A]");
        } else if (task.priority === "Medium") {
            priority_task.classList.add("bg-[#D97706]");
        } else if (task.priority === "High") {
            priority_task.classList.add("bg-[#EA580C]");
        } else if (task.priority === "Critical") {
            priority_task.classList.add("bg-[#DC2626]");
        }

        importance_task.textContent = task.importance;
        importance_task.className = "text-[10px] text-[#06255Bff] rounded-lg p-2";

        if (task.importance === "Low") {
            importance_task.classList.add("bg-[#16A34A]");
        } else if (task.importance === "Medium") {
            importance_task.classList.add("bg-[#D97706]");
        } else if (task.importance === "High") {
            importance_task.classList.add("bg-[#EA580C]");
        }

        size_task.textContent = task.size;
        size_task.className = "bg-[#6F41EAff] text-[10px] text-[#06255Bff] rounded-lg p-2";

        deadline_task.textContent = task.deadline;
        deadline_task.className = "bg-[#6F41EAff] text-[10px] text-[#06255Bff] rounded-lg p-2";

        div_footer.className = "flex justify-beetwen item-center gap-[20px]";
        div_footer.appendChild(priority_task)
        div_footer.appendChild(importance_task)
        div_footer.appendChild(size_task)
        div_footer.appendChild(deadline_task);
        div_parent.appendChild(div_footer);
        parent.appendChild(div_parent);


    }
    if(parent.id === "Done"){
        dragon_drop(id);
    }
}

export function dragon_drop(id) {
    let drag = null

    const cartt = document.querySelectorAll(".cart")
    const cart_do = document.querySelector("#Do");
    const cart_cour = document.querySelector("#Cours");
    const cart_done = document.querySelector("#Done");
    const coln = document.querySelectorAll(".colone");
    console.log(cart_do);

    cartt.forEach(cart => {
        cart.addEventListener('dragstart', (e) => {
            drag = cart;
            cart.style.opacity = "0.5"
        })
        cart.addEventListener("dragend", (e) => {
            drag = null;
            cart.style.opacity = "1"
        })
        coln.forEach(c => {
            c.addEventListener("dragover", (e) => {
                e.preventDefault()
                c.parentNode.style.background = "#B4C9F3ff"

            })
            c.addEventListener("dragleave", (e) => {
                c.parentNode.style.background = ""

            })

            c.addEventListener("drop", (e) => {
               let i = 1;
               if(i=== 1){

                console.log(drag);
                c.appendChild(drag);
                console.log(c.dataset.status);
                c.parentNode.style.background = "";
                console.log(drag.dataset.id);
                updateStatut(drag.dataset.id, c.dataset.status, id);
                i++;
                console.log(i);
                drag = null;
            }
            })
        })

    })


}
