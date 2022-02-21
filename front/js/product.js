//Utilisation de URLSearchParams afin de récupérer les id produits pour la page produit.

let params = new URLSearchParams(document.location.search);
let idParams = params.get("id");

/*Utilisation d'un fetch pour récupérer les produits
un par un sous forme d'objets.
fetch mis en place dans une fonction qui sera mise 
dans une fonction asynchrone par la suite par souci d'exécution du code*/

const getProduct = () =>
    fetch(`http://localhost:3000/api/products/${idParams}`)
        .then(res => res.json())
        .then(data => data)
        .catch(function (err) {
            console.log('error', err);
            window.alert("Une erreur d'affichage est survenue, veuillez nous excuser.")
        });


/*Fonction qui me permet d'aller chercher chacun des éléments
nécessaires pour remplir mon document html de manière dynamique.*/

const displayProduct = (product) => {
    document.querySelector(".item__img").innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;
    document.getElementById("title").textContent = `${product.name}`;
    document.getElementById("price").textContent = `${product.price}`;
    document.getElementById("description").textContent = `${product.description}`;

    /*Utilisation d'une boucle pour les valeurs de couleurs
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

    let minValue = document.getElementById("quantity");
    minValue.value = 1;
};


/*Fonction qui me permet d'entendre l'évenement au clic du bouton "ajouter au panier"
   et de garder en mémoire les produits. Je définis par la même occasion les paramètres que je souhaite garder,
   à savoir l'id, la color et la quantité.*/

function listenEvents() {
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
        if (keepColor) {

            if (window.confirm("Souhaitez-vous ajouter ce produit au panier?")) {
                basket.addToBasket(product);

            }
        } else {
            return window.alert("Veuillez sélectionner une couleur");
        }
    });

};


/*Fonction asynchrone qui me permet de mettre mes autres fonctions en attente et dans laquelle j'invoque mes fonctions*/
const main = async () => {
    const product = await getProduct();
    displayProduct(product);
    listenEvents();

}

main();