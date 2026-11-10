// page js :  de gestion tout qui est cote de UI/UX :

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