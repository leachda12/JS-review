// ----- DOM objects ----- //
const cart = document.querySelector('.cart-items');
const addButtons = document.querySelectorAll('.shop-item-button');


// ----- Cart Array ----- //
let cartItems = [];


// ----- Event Listeners ----- //
addButtons.forEach(e => {
    e.addEventListener('click', () => cartAdd(e))
});
document.querySelector('.btn-purchase').addEventListener('click', () => cartPurchase());


// ----- Functions ----- //
function cartAdd(e) {
    let itemRow = e.parentElement.parentElement;
    let itemTitle = itemRow.querySelector('.shop-item-title').innerText;
    let itemPrice = itemRow.querySelector('.shop-item-price').innerText;
    let itemPic = itemRow.querySelector('.shop-item-image').src;
    let cartItem = document.createElement('div');
    let itemTest = [];

    cart.querySelectorAll('.cart-item-title').forEach(e => {
        let iTitle = e.innerText;
        itemTest.push(iTitle);
    });

    if (itemTest === undefined || !itemTest.includes(itemTitle))  {
        cartItem.classList.add('cart-row');
        cartItem.innerHTML =
            `<div class="cart-item cart-column">
                <img class="cart-item-image" src="${itemPic}" width="100" height="100">
                <span class="cart-item-title">${itemTitle}</span>
            </div>
            <span class="cart-price cart-column">${itemPrice}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;
        cart.appendChild(cartItem);
    
        cartItem.querySelector('.btn-danger').addEventListener('click', () => cartRemove(cartItem));
        cartItem.querySelector('.cart-quantity-input').addEventListener('change', () => quantityChanged(cartItem));
    }
    else if (itemTest.includes(itemTitle)) {
        alert('Item already in cart, quantity has been updated');
        cart.querySelectorAll('.cart-row').forEach(e => {
            let item = e.querySelector('.cart-item-title').innerText;
            if (item === itemTitle) {
                let quantity = e.querySelector('.cart-quantity-input');
                quantity.value++;
            }
        });
    }
    else {
        console.log('else');
    }

    updateTotal();
};

function cartRemove(e) {
    let item = e;
    item.remove();
    updateTotal();
};

function quantityChanged(e) {
    let input = e.querySelector('.cart-quantity-input');
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
};

function updateTotal() {
    let total = 0;
    let cartItemContainer = document.querySelector('.cart-items');
    let cartRows = cartItemContainer.querySelectorAll('.cart-row');
    cartRows.forEach(e => {
        let priceElement = e.querySelector('.cart-price');
        let quantityElement = e.querySelector('.cart-quantity-input');
        let price = parseFloat(priceElement.textContent.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    });
    total = Math.round(total * 100) / 100;
    document.querySelector('.cart-total-price').textContent = '$' + total;
};

function cartPurchase() {
    alert('We only accept cash and Visa Gift Cards mailed to us through USPS, we look forward to receiving your payment!');
    let cartItems = document.querySelector('.cart-items');
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateTotal();
}