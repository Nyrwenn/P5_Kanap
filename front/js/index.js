//const utilisable au niveau de l'affichage produits (produits ou erreur)
const element = document.getElementById("items");

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
    const allProducts = await basket.getProducts();
    displayProducts(allProducts);
}

main();