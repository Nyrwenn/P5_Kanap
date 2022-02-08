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

/*fonction asynchrone qui me permet de mettre mes autres fonctions en attente*/

const main = async () => {
    const product = await getProduct();
    const displayParams = await displayProductParams(product);
}

main();
