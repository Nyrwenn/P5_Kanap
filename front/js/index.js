//const utilisable au niveau de l'affichage produits (produits ou erreur)
const element = document.getElementById("items");

//Mise en place d'un fetch afin de récupérer tous les produits sur l'API
//le fetch est mis dans une fonction qui sera par la suite passée dans une autre 
//fonction asynchrone afin de pouvoir passer un paramètre "await" à la récupération 
//des valeurs de façon à ce qu'elles soient récupérées avant la fin du script.
const getProducts = () =>
    fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then(data => data)
        .catch(function (err) {
            element.innerHTML = "Une erreur d'affichage est survenue, veuillez nous excuser!"
        });

//catch qui nous permet de capter une erreur si il s'en produit une lors de l'exécution du fetch


//boucle mise dans une fonction, qui sera aussi passée dans fonction main asynchrone
//les données seront donc récupérées avant la fin du script

const displayProducts = (allProducts) => {
    for (let i in allProducts) {

        //je définis une const pour que la récupération de mes éléments dans l'API soit plus simple
        const product = allProducts[i];
        let childElement = document.createElement("a");
        childElement.href = `./product.html?id=${product._id}`

        childElement.innerHTML = `<article><img src=${product.imageUrl} alt=${product.altTxt}>
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>`;

        element.appendChild(childElement);
        //appendChild me permet de créer un nouveau noeud html pour chaque produit
    }

}


const main = async () => {
    const allProducts = await getProducts();
    const displayer = await displayProducts(allProducts);
}

main();