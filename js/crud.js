import { creation_tasks } from "./api.js"

let card = JSON.parse(localStorage.getItem("projet")) || [];

if (!localStorage.getItem("count")) localStorage.setItem("count", "5");

let count = Number(localStorage.getItem("count"));

//// function de gestion de class projet localement :

// get all element localement :
export async function getAll() {
    if (card.length != 0) {
        return card;
    } else {
        try {
            const response = await fetch('./data/projet.json');
            const data = await response.json();
            localStorage.setItem("projet", JSON.stringify(data));
            const resultat = await data;
            console.log(resultat);

            return resultat;
        } catch (error) {
            console.log(error);
        }
    }
}

// get element localement by id :
export async function getByid(id) {
    if (card) {
        card = card.find((card) => card.id === id);
        if (card === undefined) {
            return "il n'a pas cette projet , plaise recherche encore"
        } else {
            return card;
        }
    } else {
        try {
            const response = await fetch('./data/projet.json')
            const data = await response.json();
            return data.find((data) => data.id === id);
        } catch (error) {
            console.log(error);
        }
    }
}




//// function de gestion de class task localement :

let card_task = JSON.parse(localStorage.getItem("tasks")) || [];

if (!localStorage.getItem("count")) localStorage.setItem("count", `14`);

// affiche all tasks
export async function getAll_tasks() {
    if (card_task.length != 0) {
        return card_task;
    } else {
        try {
            const response = await fetch('./data/tasks.json');
            const data = await response.json();
            localStorage.setItem("tasks", JSON.stringify(data));
            const resultat = await data;
            console.log(resultat);

            return resultat;
        } catch (error) {
            console.log(error);
        }
    }
}


// affiche task to do d'un projet :
export async function gettasksDo(id) {
    if (card_task.length != 0) {
        let find = card_task.filter((card) => card.projectId === id && card.status === "To Do");
        if (find === undefined) {
            return [];
        } else {
            return find;
        }
    } else {
        try {
            const response = await fetch('./data/tasks.json')
            const data = await response.json();
            let find = data.filter((data) => data.projectId === id && data.status === "To Do");
            return find;
        } catch (error) {
            console.log(error);
        }
    }
}

// affiche task en cours d'un projet :
export async function gettasksCours(id) {
    if (card_task.length != 0) {
        let find = card_task.filter((card) => card.projectId === id && card.status === "En cours");
        if (find === undefined) {
            return [];
        } else {
            return find;
        }
    } else {
        try {
            const response = await fetch('./data/tasks.json')
            const data = await response.json();
            let find = data.filter((data) => data.projectId === id && data.status === "En cours");
            return find;
        } catch (error) {
            console.log(error);
        }
    }
}

// affiche tasks done d'un projet :
export async function gettasksDone(id) {
    if (card_task.length != 0) {
        let find = card_task.filter((card) => card.projectId === id && card.status === "Done");
        if (find === undefined) {
            return [];
        } else {
            return find;
        }
    } else {
        try {
            const response = await fetch('./data/tasks.json')
            const data = await response.json();
            let find = data.filter((data) => data.projectId === id && data.status === "Done");
            return find;
        } catch (error) {
            console.log(error);
        }
    }
}

// modifier statut d'un task : 
export async function updateStatut(id_task, status, id) {
    if (card_task.length != 0) {
        const task = card_task.find(task => task.id === id_task && task.projectId === id)
        if (task) {
            task.status = status;
            localStorage.setItem("tasks", JSON.stringify(card_task));
        } else {
            console.log("il n'a pas cette task maintenant, il doit virifier.");
            return "il n'a pas cette task maintenant, il doit virifier.";
        }
    } else {
        try {
            const response = await fetch('./data/tasks.json');
            const data = await response.json();
            const task = data.find((data) => data.id === id_task && data.projectId === id);
            task.status = status;
            localStorage.setItem("tasks", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }
}

// UPDATE ALL OBJ
export async function Update(id_task, task_update) {
    if (card_task.length != 0) {
        const task = card_task.find(task => task.id === id_task && task.projectId === id)
        if (task) {
            task.status = task_update;
            localStorage.setItem("tasks", JSON.stringify(card_task));
        } else {
            console.log("il n'a pas cette task maintenant, il doit virifier.");
            return "il n'a pas cette task maintenant, il doit virifier.";
        }
    } else {
        try {
            const response = await fetch('./data/tasks.json');
            const data = await response.json();
            const task = data.find((data) => data.id === id_task && data.projectId === id);
            task.status = task_update;
            localStorage.setItem("tasks", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }
}

//// functions de plant AI :

const projet_ai = JSON.parse(localStorage.getItem("projet_ai")) || [];

const task_ai = JSON.parse(localStorage.getItem("task_ai")) || [];

// create task and save dans local storage :
export async function traitement_data(projet) {
    try {
        if (projet.nom === null) {
            throw new Error("le nom est obligatoire * .")
        }

        if (projet.description === null) {
            throw new Error("le description est obligatoire * .")
        }

        if (projet.brief === null) {
            throw new Error("le brief est obligatoire * .")
        }

        if (projet.duree === null) {
            throw new Error("le duree est obligatoire * .");
        }

        console.log(typeof (projet.duree) !== 'number');
        console.log(typeof (projet.duree));

        if (typeof (projet.duree) !== 'number') {
            throw new Error("le duree doit etre nombre * .");
        }

        console.log(typeof (projet.nbr_dev) !== 'number');
        console.log(typeof (projet.nbr_dev));

        if (projet.nbr_dev === null) {
            throw new Error("le nbr_dev est obligatoire * .");
        }

        if (typeof (projet.nbr_dev) !== 'number') {
            throw new Error("le nbr_dev doit etre nombre * .");
        }

        if (projet.technologies === null) {
            throw new Error("le technologies est obligatoire * .");
        }

        if (projet.niveau !== "Beginner" && projet.niveau !== "Intermediate" && projet.niveau !== "Advanced") {
            throw new Error("votre choix n'a pas disponnible * .");
        }

        projet.CreateAt = Date.now();
        projet.UpdateAt = null;
        projet.id = count++;
        const task_reponce = await creation_tasks(projet);
        console.log(task_reponce);

        console.log(task_reponce.ok === true);

        if (task_reponce.ok === true && (task_reponce.texte !== "" || task_reponce.texte !== undefined)) {
            projet.CreateAt = Date.now();
            projet.UpdateAt = null;
            projet.id = count++;
            localStorage.setItem("count", count);
            projet_ai.push(projet);
            localStorage.setItem("projet_ai", JSON.stringify(projet_ai));
            task_reponce.texte = JSON.parse(task_reponce.texte).tasks
            for (let element of task_reponce.texte) {
                element.projectId = projet.id
                task_ai.push(element);
            }
            console.log("taskk : ", task_reponce.texte);
            console.log("task ai local storage : ", task_ai);
            localStorage.setItem("task_ai", JSON.stringify(task_ai));
            console.log("task de AI : ", task_reponce.texte);

            return {
                reponse: "votre creation de projet est ruessir",
                projet: projet,
                tasks: task_reponce.texte
            };
        } else if (task_reponce.ok === true && (task_reponce.texte === "" || task_reponce.texte === undefined)) {
            return "le reponse est vide , virifier votre keys API , est ce que on a problem ."
        }
        else {
            return task_reponce;
        }

    } catch (error) {
        console.log(error);
    }
}

// function of get all projet : 
export function affiche_allprojet_api(){
    if(projet_ai.length !== 0 ){
        return projet_ai ;
    } else {
        return "« Aucun projet pour le moment, créez-en un  pour générer votre premier plan. »";
    } 
}

// function of affiche projet by id :
export function affiche_projetById_api(id){
    if(projet_ai.length !== 0 ){
        let find = projet_ai.find( (card) => card.id === id );
        if ( find === undefined ) {
            return [];
        } else {
            return find;
        }
    }else {
        return "« Aucun projet pour le moment, créez-en un pour générer votre premier plan. »";
    }
}

// function for get taskes with projet_id :
export function affiche_tasksByprojetId_api(id){
    if(task_ai.length !== 0 ){
        let find = task_ai.find( (task) => task.projectId === id );
        if ( find === undefined ) {
            return [];
        } else {
            return find;
        }
    }else {
        return "« Aucun projet pour le moment, créez-en un pour générer votre premier plan. »";
    }
}


// affiche task to do d'un projet :
export async function gettasks_AiDo(id) {
    if (task_ai.length != 0) {
        let find = task_ai.filter((card) => card.projectId === id && card.status === "To Do");
        if (find === undefined) {
            return [];
        } else {
            return find;
        }
    }
}

// affiche task en cours d'un projet :
export async function gettasks_AiCours(id) {
    if (task_ai.length != 0) {
        let find = task_ai.filter((card) => card.projectId === id && card.status === "En cours");
        if (find === undefined) {
            return [];
        } else {
            return find;
        }
    }
}

// affiche tasks done d'un projet :
export async function gettasks_AiDone(id) {
    if (task_ai.length != 0) {
        let find = task_ai.filter((card) => card.projectId === id && card.status === "Done");
        if (find === undefined) {
            return [];
        } else {
            return find;
        }
    }
}

// UPDATE ALL OBJ
export async function Update_statut(id_task, task_update, id) {
    if (task_ai.length != 0) {
        const task = task_ai.find(task => task.id === id_task && task.projectId === id)
        if (task.length != 0) {
            task.status = task_update;
            console.log(task);
            localStorage.setItem("task_ai", JSON.stringify(task_ai));
        } else {
            console.log("il n'a pas cette task maintenant, il doit virifier.");
            return "il n'a pas cette task maintenant, il doit virifier.";
        }
    }
}