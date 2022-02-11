/*Je vais récupérer mon panier depuis mon localStorage*/

let storage = JSON.parse(localStorage.getItem("cart"));

/*Je crée ma fonction qui me permettra d'aller insérer mes éléments dans le DOM*/
/*création d'une const pour faciliter la relation parent-enfant*/

const element = document.getElementById("cart__items");

const displayProducts = (products, storageToShow) => {
    let childElement = document.createElement("article")
    childElement.class = "cart__item";
    childElement["data-id"] = storageToShow.id;
    childElement["data-color"] = storageToShow.color;

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
          <p class="deleteItem" data-color="${storageToShow.color}" data-id="${storageToShow.id}" id="${storageToShow.id}${storageToShow.color}">Supprimer</p>
        </div>
      </div>
    </div>`

    element.appendChild(childElement);

    /* Je viens récupérer l'élément avec mes deux clés id et color, j'ajoute un event listener au clic 
    pour savoir quand quelqu'un a cliqué sur supprimer.
    A la suite de ça je vais comparer les data récupérées par le clic et celles de mon storage pour la suppression*/

    const keepElement = document.getElementById(`${storageToShow.id}${storageToShow.color}`);
    keepElement.addEventListener("click", function () {
        const dataColor = keepElement.dataset.color;
        const dataId = (keepElement.dataset.id);

        for (let i in storage) {
            if (storage[i].id === dataId && storage[i].color === dataColor) {
                storage.splice(i, 1);

                /*ne pas oublier de récupérer la valeur et de mettre à jour mon local storage*/

                try {
                    localStorage.setItem("cart", JSON.stringify(storage));
                    location.reload();
                } catch (err) {
                    console.log("error", err);
                }
            }

        }
    })
}

/*Je vais récupérer  mes données API pour avoir les clés pour afficher le panier utilisateur*/

for (let storageToShow of storage) {

    const getProducts = () =>
        fetch(`http://localhost:3000/api/products/${storageToShow.id}`)
            .then(res => res.json())
            .then(data => data)
            .catch(function (err) {
                console.log("error", err);
            });

    const main = async () => {
        const products = await getProducts();
        const displayer = await displayProducts(products, storageToShow);
    }

    main();

}




