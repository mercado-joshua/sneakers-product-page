"use strict";

var shoppingCart = function shoppingCart() {
  var cartBtn = document.querySelector('[data-js-cart-btn]');
  var checkoutBtn = document.querySelector('[data-js-checkout-btn]');
  var shoppingList = document.querySelector('[data-js-shopping-cart]');
  cartBtn.addEventListener('click', function (event) {
    shoppingList.classList.toggle('-show');
  });
  checkoutBtn.addEventListener('click', function (event) {
    shoppingList.classList.toggle('-show');
  });
};

document.addEventListener('readystatechange', function (event) {
  if (event.target.readyState === 'complete') shoppingCart();
});