/*Je crée ma fonction qui me permettra d'aller insérer mes éléments dans le DOM
création d'une variable pour faciliter la relation parent-enfant*/

const element = document.getElementById("cart__items");

const displayProducts = (products, basketToShow) => {
    let childElement = document.createElement("article");
    childElement.classList.add("cart__item");
    childElement.dataset.id = basketToShow.id;
    childElement.dataset.color = basketToShow.color;

    childElement.innerHTML = `<div class="cart__item__img">
      <img src=${products.imageUrl} alt=${products.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${products.name}</h2>
        <p>${basketToShow.color}</p>
        <p>${products.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${basketToShow.quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>`

    element.appendChild(childElement);
}
/*Fonction qui me permet d'afficher le nombre total d'articles dans mon panier
 et le prix total de mon panier*/
const total = async () => {

    const totalArticlesToShow = document.getElementById("totalQuantity");
    totalArticlesToShow.textContent = basket.getAllArticles();

    const totalPriceToShow = document.getElementById("totalPrice");
    totalPriceToShow.textContent = await basket.getAllPrices();

}


/*Fonction qui recherche quel est le produit à afficher en fonction du panier*/

async function displayAllProducts() {
    /*J'attends que la fonction ait fini de m'afficher tous les éléments*/
    const products = await basket.getProducts();
    for (let basketToShow of basket.returnBasket()) {
        const product = products.filter(p => p._id === basketToShow.id)
        displayProducts(product[0], basketToShow);
    }
    return
}


/*Fonction qui va aller de pair avec ma fonction de suppression.
Elle me permet d'écouter l'événement au clic du bouton suppression et de récupérer les 
données id et couleur des éléments */
function listenDeleteElements() {

    const elementsDelete = document.querySelectorAll(".deleteItem");
    for (let elt of elementsDelete) {
        elt.addEventListener("click", function (event) {

            /*event target cible précisément l'élément, closest me permet de récupérer les id et
            les colors de l'élément parent*/
            const findParent = event.target.closest("article");
            const dataColor = findParent.dataset.color;
            const dataId = findParent.dataset.id;

            basket.deleteElements(dataId, dataColor);

        })
    }
}

/*Fonction qui me permet d'écouter les événements liés au changement de quantités.
Je réutilise les fonctions de ma classe pour éviter les répétitions*/
function listenChangeQuantities() {

    /*Mise en place de l'event listener pour les input quantité*/
    const itemQuantity = document.getElementsByName("itemQuantity");

    for (let item of itemQuantity) {
        item.addEventListener("change", function (event) {
            const findParent = event.target.closest("article");
            const dataId = findParent.dataset.id;
            const dataColor = findParent.dataset.color;
            const keepQuantities = parseInt(event.target.value);

            basket.changeQuantities(dataId, dataColor, keepQuantities);

        })

    }
}





/* Fonction asynchrone qui me permet d'attendre que tous les produits soient affichés
avant de passer à la suite du code*/


async function main() {
    await displayAllProducts();
    listenDeleteElements();
    listenChangeQuantities();
    await total();

}

main();
