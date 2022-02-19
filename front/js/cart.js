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


function validation() {
    const regexName = /(^.{1,}[a-zA-ZÀ-ÿ]+$)/;

    const firstName = document.getElementById("firstName");
    firstName.addEventListener("input", function (event) {

        let nameTarget = event.target.value;
        let isValid = regexName.test(nameTarget);
        let msgError = document.getElementById("firstNameErrorMsg");
        if (isValid === false) {
            msgError.textContent = "Veuillez saisir un prénom valide, sans chiffres.";
            msgError.style.display = "block";
        } else {
            msgError.style.display = "none";
        }

    })


    const lastName = document.getElementById("lastName");
    lastName.addEventListener("input", function (event) {
        let nameTarget = event.target.value;
        let isValid = regexName.test(nameTarget);
        let msgError = document.getElementById("lastNameErrorMsg");
        if (isValid === false) {
            msgError.textContent = "Veuillez saisir un nom valide, sans chiffres.";
            msgError.style.display = "block";
        } else {
            msgError.style.display = "none";
        }

    })
    const regexAddress = /^.{12,}/;
    const address = document.getElementById("address");
    address.addEventListener("input", function (event) {
        let addressTarget = event.target.value;
        let isValid = regexAddress.test(addressTarget);
        let msgError = document.getElementById("addressErrorMsg");
        if (isValid === false) {
            msgError.textContent = "Veuillez saisir une adresse valide exemple: 6 rue Jules Verne 31700.";
            msgError.style.display = "block";
        } else {
            msgError.style.display = "none";
        }

    })

    const regexCity = /^.{2,}[a-zA-Z]+$/;

    const city = document.getElementById("city");
    city.addEventListener("input", function (event) {
        let cityTarget = event.target.value;
        let isValid = regexCity.test(cityTarget);
        let msgError = document.getElementById("cityErrorMsg");

        if (isValid === false) {
            msgError.textContent = "Veuillez saisir une ville valide exemple: Toulouse.";
            msgError.style.display = "block";
        } else {
            msgError.style.display = "none";
        }
    })

    const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const email = document.getElementById("email");
    email.addEventListener("input", function (event) {
        let emailTarget = event.target.value;
        let isValid = regexMail.test(emailTarget);
        let msgError = document.getElementById("emailErrorMsg");

        if (isValid === false) {
            msgError.textContent = "Veuillez saisir un email valide exemple: johndoe6@gmail.com.";
            msgError.style.display = "block";
        } else {
            msgError.style.display = "none";
        }

    })
}


/* Fonction asynchrone qui me permet d'attendre que tous les produits soient affichés
avant de passer à la suite du code*/


async function main() {
    await displayAllProducts();
    listenDeleteElements();
    listenChangeQuantities();
    await total();
    validation();

}

main();
