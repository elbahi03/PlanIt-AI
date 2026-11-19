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

// creation de projet :
export async function createprojet(projet) {
    try {
        if (projet.name === null) {
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

        if (projet.duree != Number) {
            throw new Error("le duree doit etre nombre * .");
        }

        if (projet.nbr_dev === null) {
            throw new Error("le nbr_dev est obligatoire * .");
        }

        if (projet.nbbr_dev != Number) {
            throw new Error("le nbr_dev doit etre nombre * .");
        }

        if (projet.technologies === null) {
            throw new Error("le technologies est obligatoire * .");
        }

        if (projet.difficulte != Beginner && projet.difficulte != Intermediate && projet.difficulte != Advanced) {
            throw new Error("votre choix n'a pas disponnible * .");
        }

        projet.CreateAt = Date.now();
        projet.UpdateAt = null;
        projet.id = count++;
        localStorage.setItem("count", count);

        card.push(projet);
        localStorage.setItem("projet", JSON.stringify(card))

        return ["votre creation de projet est ruessir", projet];

    } catch (error) {
        console.log(error);
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
    }else {
        try {
            const response = await fetch('./data/tasks.json');
            const data = await response.json();
            const task =  data.find((data) => data.id === id_task && data.projectId === id);
            task.status = status ;
            localStorage.setItem("tasks", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        } 
    }
}

export async function Update(id_task, task_update){
    if (card_task.length != 0) {
        const task = card_task.find(task => task.id === id_task && task.projectId === id)
        if (task) {
            task.status = task_update;
            localStorage.setItem("tasks", JSON.stringify(card_task));
        } else {
            console.log("il n'a pas cette task maintenant, il doit virifier.");
            return "il n'a pas cette task maintenant, il doit virifier.";
        }       
    }else {
        try {
            const response = await fetch('./data/tasks.json');
            const data = await response.json();
            const task =  data.find((data) => data.id === id_task && data.projectId === id);
            task.status = task_update ;
            localStorage.setItem("tasks", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        } 
    }
}