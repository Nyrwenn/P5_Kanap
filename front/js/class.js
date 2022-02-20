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
        console.log(this.basket);

    }

    returnBasket() {
        return this.basket;
    }

    /*Fonction fetch qui me permet de récupérer tous les produits de l'API,
    réutilisable sur plusieurs pages du site*/
    getProducts() {

        return fetch(`http://localhost:3000/api/products`)
            .then(res => res.json())
            .then(data => data)
            .catch(function (err) {
                window.alert("Une erreur d'affichage est survenue, veuillez nous excuser!");
            });
    }
    /*Fonction qui me permet de sauvegarder mon panier dans mon storage*/
    saveBasket() {
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

    /*Fonction qui me sert à supprimer les articles du panier et du local storage*/
    deleteElements(id, color) {

        for (let i in this.basket) {
            if (this.basket[i].id === id && this.basket[i].color === color) {

                this.basket.splice(i, 1);
                /*ne pas oublier de récupérer la valeur et de mettre à jour mon local storage*/

                this.saveBasket();
                location.reload();


            }

        }
    }

    changeQuantities(id, color, quantity) {
        /*Je vérifie grâce à ma boucle que les id et la quantité correspondent bien,
                afin de modifier le bon élément dans mon storage*/
        for (let i in this.basket) {
            if (this.basket[i].id === id && this.basket[i].color === color) {
                this.basket[i].quantity = quantity;

                /*Je récupère ma valeur et je met à jour mon storage avec la nouvelle valeur*/
                this.saveBasket();
                location.reload();
            }
        }
    }

    /*Fonction qui me permet de calculer le nombre total d'articles
    présents dans le panier*/
    getAllArticles() {

        let totalArticles = 0;
        for (let i in this.basket) {
            const allArticles = this.basket[i].quantity;

            totalArticles += allArticles;


        }
        return totalArticles;
    }

    /*Fonction qui me permet d'aller chercher les prix des produits 
    directement dans l'API en les faisant corroborer avec leur id.
    Grâce à la quantité des articles en fonction des id je calcule le prix total*/
    async getAllPrices() {

        let totalPrice = 0;
        const allProducts = await this.getProducts();

        for (let j in this.basket) {


            for (let i in allProducts) {
                const price = allProducts[i].price;
                const id = allProducts[i]._id;


                if (this.basket[j].id === allProducts[i]._id) {
                    totalPrice += this.basket[j].quantity * allProducts[i].price;


                }
            }
        }
        return totalPrice;
    }



    post(contact) {

        const allId = [];

        for (let i in this.basket) {

            for (let j = 0; j < this.basket[i].quantity; j++) {

                allId.push(this.basket[i].id);

            }

        }

        const dataToSend = {
            products: allId,
            contact: contact,
        }
        console.log(dataToSend);
        const headers = new Headers();
        fetch('http://localhost:3000/api/products/order',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',


                },
                body: JSON.stringify(dataToSend)
            }).then(res => res.json())
            .then(data => {
                document.location.href = `./confirmation.html?orderId=${data.orderId}`;

            })



    }

}



const basket = new Basket();