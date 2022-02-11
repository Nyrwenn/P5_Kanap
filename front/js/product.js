//utilisation de URLSearchParams afin de récupérer les id produits pour la page produit.

let params = new URLSearchParams(document.location.search);
let idParams = params.get("id");

/*utilisation d'un fetch pour récupérer les produits
un par un sous forme d'objets.
fetch mis en place dans une fonction qui sera mise 
dans une fonction asynchrone par la suite par souci d'exécution du code*/

const getProduct = () =>
    fetch(`http://localhost:3000/api/products/${idParams}`)
        .then(res => res.json())
        .then(data => data)
        .catch(function (err) {
            console.log('error', err);
        });


/*fonction qui me permet d'aller chercher chacun des éléments
nécessaires pour remplir mon document html de manière dynamique.*/

const displayProductParams = (product) => {
    document.querySelector(".item__img").innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;
    document.getElementById("title").textContent = `${product.name}`;
    document.getElementById("price").textContent = `${product.price}`;
    document.getElementById("description").textContent = `${product.description}`;


    /*utilisation d'une boucle pour les valeurs de couleurs
    il y en a plusieurs donc je veux pouvoir toutes les afficher 
    dans le menu déroulant.*/


    for (let i in product.colors) {
        const colors = product.colors[i];
        const element = document.getElementById("colors");
        let childElement = document.createElement("option");

        childElement.value = colors;
        childElement.textContent = colors;

        element.appendChild(childElement);
    }
};

/*Fonction asynchrone qui me permet de mettre mes autres fonctions en attente*/

const main = async () => {
    const product = await getProduct();
    const displayParams = await displayProductParams(product);
}

main();

/*Mise en place des constantes permettant de garder en local storage les valeurs enregistrées pour le panier*/

const addToStorage = () => {
    const keepColor = document.getElementById("colors").value;
    const keepQuantity = parseInt(document.getElementById("quantity").value, 10);

    /*Mise en place de conditions d'erreur si les données couleur et quantité ne sont pas saisies*/

    if (!keepColor) {
        return window.alert("Veuillez sélectionner une couleur");
    }
    if (keepQuantity < 1) {
        return window.alert("Veuillez saisir une quantité");
    }

    /*Je vais récupérer les produits qui sont dans mon local storage, mais je les
    parse pour pouvoir les lire*/

    let storage = JSON.parse(localStorage.getItem("cart"));

    /*Je définis un tableau pour pouvoir push mes données
    si je ne fais pas ça il y a une erreur "null" qui se log*/

    if (storage === null) {
        storage = [];
    }

    /*boucle qui va parcourir directement le localStorage et qui me permet d'éviter d'avoir des produits similaires 
    en double sur plusieurs lignes, si les produits ont le même nom et la même couleur que ceux déjà 
    dans le panier, alors on incrémentera la quantité seulement.*/

    for (let i in storage) {
        const productInCart = storage[i];

        if (productInCart.id === idParams && productInCart.color === keepColor) {
            productInCart.quantity = keepQuantity + productInCart.quantity;
            try {
                localStorage.setItem("cart", JSON.stringify(storage));
            } catch (err) {
                return window.alert("Attention l'enregistrement n'a pas fonctionné");
            }
        }
    }
    /*Je push les paramètres à enregistrer dans mon tableau*/

    storage.push({
        id: idParams,
        color: keepColor,
        quantity: keepQuantity,
    })

    try {
        localStorage.setItem("cart", JSON.stringify(storage));
    } catch (err) {
        return window.alert("Attention l'enregistrement n'a pas fonctionné");
    }
}

/*fonction qui va me permettre d'entendre l'évenement au clic du bouton "ajouter au panier"
et de garder en mémoire les produits*/

const keepElement = document.getElementById("addToCart");
keepElement.addEventListener("click", function () {
    addToStorage();
});