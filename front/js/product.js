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

const displayProduct = (product) => {
    document.querySelector(".item__img").innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;
    document.getElementById("title").textContent = `${product.name}`;
    document.getElementById("price").textContent = `${product.price}`;
    document.getElementById("description").textContent = `${product.description}`;

    /*utilisation d'une boucle pour les valeurs de couleurs
    il y en a plusieurs donc je veux pouvoir toutes les afficher 
    dans le menu déroulant.*/
    for (let i in product.colors) {
        const color = product.colors[i];
        const element = document.getElementById("colors");
        let childElement = document.createElement("option");

        childElement.value = color;
        childElement.textContent = color;

        element.appendChild(childElement);
    }
};

/*Fonction qui me permet de sauvegarder mon panier dans mon storage*/
function saveBasket(basket) {
    localStorage.setItem("cart", JSON.stringify(basket));
}

/*Fonction qui me permet de récupérer mon panier depuis mon local storage
Le panier de base sera vide, je crée donc un tableau pour ne pas avoir de "null"*/
function getBasket() {
    let basket = localStorage.getItem("cart");

    if (basket == null) {
        basket = [];
    } else {
        return JSON.parse(basket);
    }
}


/*Fonction qui me permet de vérifier que mes champs couleur et quantités soient bien remplis avant
que l'utilisateur clique sur "ajouter au panier"*/
function checkupInput(color, quantity) {
    if (!color) {
        return window.alert("Veuillez sélectionner une couleur");
    }
    if (quantity < 1) {
        return window.alert("Veuillez saisir une quantité");
    }
}

/*Fonction qui me permet d'ajouter un produit au panier.
La boucle à l'intérieur me permet de vérifier si un produit similaire se trouve déjà dans mon panier,
si tel est le cas la quantité sera incrémentée. Si le produit n'existe pas, une ligne s'ajoute au panier*/
function addToBasket(product) {
    let basket = getBasket();
    for (let i in basket) {
        const productInBasket = basket[i];

        if (productInBasket.id === product.id && productInBasket.color === product.color) {
            productInBasket.quantity = product.quantity + productInBasket.quantity;
            saveBasket(basket);
            return;

        }

    }
    basket.push(product);
    saveBasket(basket);
    return;
}

/*Fonction qui me permet d'entendre l'évenement au clic du bouton "ajouter au panier"
et de garder en mémoire les produits. Je définis par la même occasion les paramètres que je souhaite garder,
à savoir l'id, la color et la quantité.*/

function listenBasket() {
    const keepElement = document.getElementById("addToCart");
    keepElement.addEventListener("click", function () {
        let id = idParams;
        let keepColor = document.getElementById("colors").value;
        let keepQuantity = parseInt(document.getElementById("quantity").value);
        const product = {
            id: id,
            color: keepColor,
            quantity: keepQuantity,
        }
        checkupInput(keepColor, keepQuantity);
        addToBasket(product);
    })
};

/*Fonction asynchrone qui me permet de mettre mes autres fonctions en attente et dans laquelle j'invoque mes fonctions*/

const main = async () => {
    const product = await getProduct();
    displayProduct(product);
    listenBasket();
}

main();