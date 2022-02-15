/*Je vais récupérer mon panier depuis mon localStorage*/

let storage = JSON.parse(localStorage.getItem("basket"));

/*Fonction qui permet d'aller récupérer une fiche produit dans l'API par son id*/
const getProducts = (id) =>
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(res => res.json())
        .then(data => data)
        .catch(function (err) {
            console.log("error", err);
        });

/*Je crée ma fonction qui me permettra d'aller insérer mes éléments dans le DOM
création d'une variable pour faciliter la relation parent-enfant*/

const element = document.getElementById("cart__items");

const displayProducts = (products, storageToShow) => {
    let childElement = document.createElement("article");
    childElement.classList.add("cart__item");
    childElement.dataset.id = storageToShow.id;
    childElement.dataset.color = storageToShow.color;

    childElement.innerHTML = `<div class="cart__item__img">
      <img src=${products.imageUrl} alt=${products.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${products.name}</h2>
        <p>${storageToShow.color}</p>
        <p>${products.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${storageToShow.quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>`

    element.appendChild(childElement);
}

/*Je vais récupérer mes données API pour avoir les clés pour afficher le panier utilisateur*/

async function displayAllProducts() {
    for (let storageToShow of storage) {
        /*J'attends que la fonction ait fini de m'afficher tous les éléments*/
        const products = await getProducts(storageToShow.id);
        displayProducts(products, storageToShow);

    }
    return
}


/*Fonction qui me sert à supprimer les articles du panier et du local storage*/
const deleteElements = () => {

    let elementsDelete = document.querySelectorAll(".deleteItem");

    for (elt of elementsDelete) {
        elt.addEventListener("click", function (event) {
            /*event target cible précisément l'élément, closest me permet de récupérer les id et
            les colors de l'élément parent*/
            const findParent = event.target.closest("article");
            const dataColor = findParent.dataset.color;
            const dataId = findParent.dataset.id;

            for (let i in storage) {
                if (storage[i].id === dataId && storage[i].color === dataColor) {
                    storage.splice(i, 1);

                    /*ne pas oublier de récupérer la valeur et de mettre à jour mon local storage*/

                    try {
                        localStorage.setItem("basket", JSON.stringify(storage));
                        location.reload();
                    } catch (err) {
                        console.log("error", err);
                    }
                }

            }

        })
    }
}

/*Fonction qui va permettre la modifications des quantités depuis la page panier, et qui modifiera mon local storage*/

const modifyQuantities = () => {
    /*Mise en place de l'event listener pour les input quantité*/
    let itemQuantity = document.getElementsByName("itemQuantity");

    for (item of itemQuantity) {
        item.addEventListener("change", function (event) {
            const findParent = event.target.closest("article");
            const keepValue = event.target.value;
            const dataColor = findParent.dataset.color;
            const dataId = findParent.dataset.id;

            /*Je vérifie grâce à ma boucle que les id et la quantité correspondent bien,
            afin de modifier le bon élément dans mon storage*/
            for (let i in storage) {
                if (storage[i].id === dataId && storage[i].color === dataColor) {
                    storage[i].quantity = keepValue;

                    /*Je récupère ma valeur et je met à jour mon storage avec la nouvelle valeur*/

                    try {
                        localStorage.setItem("basket", JSON.stringify(storage));
                        location.reload();
                    } catch (err) {
                        console.log("error", err);
                    }
                }

            }
        }
        )
    }
}

/*const calculateTotal = () => {
    for (let totalQuantities of storage) {


    }


}*/


/* Fonction asynchrone qui me permet d'attendre que tous les produits soient affichés
avant de passer à la suite du code*/

async function main() {
    await displayAllProducts();
    deleteElements();
    modifyQuantities();

}

main();
