let order = new URLSearchParams(document.location.search);
let orderId = order.get("orderId");

console.log(orderId);

function displayOrderId() {
    let orderDisplayed = document.getElementById("orderId");
    orderDisplayed.textContent = orderId;
}

displayOrderId();