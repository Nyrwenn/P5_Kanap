class Basket {

    constructor() {
        /*Fonction qui me permet de récupérer mon panier depuis mon local storage
        Le panier de base sera vide, je crée donc un tableau pour ne pas avoir de "null". De plus grâce à mon constructor
        je n'aurais pas besoin de récupérer mon panier pour chaque fonction utilisée, il sera chargé dès le début*/
        let basket = localStorage.getItem("basket");

        if (basket == null) {
            this.basket = [];
        } else {
            this.basket = JSON.parse(basket);
        }
    }
    /*Fonction qui me permet de sauvegarder mon panier dans mon storage*/
    saveBasket() {
        console.log(this.basket);
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }

    /*Fonction qui me permet d'ajouter un produit au panier.
La boucle à l'intérieur me permet de vérifier si un produit similaire se trouve déjà dans mon panier,
si tel est le cas la quantité sera incrémentée. Si le produit n'existe pas, une ligne s'ajoute au panier*/
    addToBasket(product) {

        for (let i in this.basket) {
            const productInBasket = this.basket[i];

            if (productInBasket.id === product.id && productInBasket.color === product.color) {
                productInBasket.quantity = product.quantity + productInBasket.quantity;
                this.saveBasket();
                return;

            }
        }
        this.basket.push(product);
        this.saveBasket();
        return;
    }
}

const basket = new Basket();