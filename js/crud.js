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
            const resultat = await data ;
            console.log(resultat);
            
            return resultat;
        } catch (error) {
            console.log(error);
        }
    }
}
getAll();
// get element localement by id :
export async function getByid(id) {
    if (card) {
        card = JSON.parse(card);
        card = card.find((card) => card.id === id);
        if (card === null) {
            return "il n'a pas cette projet , plaise recherche encore"
        } else {
            return card;
        }
    } else {
        try {
            const response = await fetch('./data/carts.json')
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


