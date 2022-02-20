/*Mise en place d'un URL search params afin de récupérer l'orderId*/

let order = new URLSearchParams(document.location.search);
let orderId = order.get("orderId");

console.log(orderId);

/*Fonction qui me permet d'afficher le numéro de commande pour le client*/

function displayOrderId() {
    let orderDisplayed = document.getElementById("orderId");
    orderDisplayed.textContent = orderId;
}

displayOrderId();