//Mise en place d'un fetch afin de récupérer tous les produits sur l'API
//le fetch est mis dans une fonction qui sera par la suite passée dans une autre 
//fonction asynchrone afin de pouvoir passer un paramètre "await" à la récupération 
//des valeurs de façon à ce qu'elles soient récupérées avant la fin du script.
const getProducts = () =>
    fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then(data => data)
        .catch(function (err) {
            console.log('erreur de chargement...', err)
        });

//catch qui nous permet de capter une erreur si il s'en produit une lors de l'exécution du fetch


//boucle mise dans une fonction, qui sera aussi passée dans fonction main asynchrone
//les données seront donc récupérées avant la fin du script

const displayProducts = (allProducts) => {
    for (let i in allProducts) {

        //je définis une const pour que la récupération de mes éléments dans l'API soit plus simple
        const product = allProducts[i];
        let element = document.getElementById("items");
        let childElement = document.createElement("a");

        childElement.innerHTML = `<a href="./product.html?id=${product._id}"><article>
        <img src=${product.imageUrl} alt=${product.altTxt}>
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article></a>`;

        element.appendChild(childElement);
        //appendChild me permet de créer un nouveau noeud html pour chaque produit
    }

}


const main = async () => {
    const allProducts = await getProducts();
    const displayer = await displayProducts(allProducts);
}

main();