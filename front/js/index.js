//Mise en place d'un fetch afin de récupérer tous les produits sur l'API//

fetch('http://localhost:3000/api/products')
    .then(function (res) {
        return res.json();
    })
    .then(function (value) {
        console.log(value);
    })
    .catch(function (err) {
        console.log('error', err);
    });

