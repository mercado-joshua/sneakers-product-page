"use strict";

var navSection = function navSection() {
  var overlay = document.querySelector('[data-js-overlay]');
  var menuBtn = document.querySelector('[data-js-menu-btn]');
  var closeBtn = document.querySelector('[data-js-close-btn]');
  var navSection = document.querySelector('[data-js-nav-section]');
  var shoppingList = document.querySelector('[data-js-shopping-cart]');
  menuBtn.addEventListener('click', function (event) {
    shoppingList.classList.remove('-show');
    navSection.classList.toggle('-expand');
    overlay.classList.add('-show');
  }); // Close offsite navigation.

  closeBtn.addEventListener('click', function (event) {
    navSection.classList.toggle('-expand');
    overlay.classList.remove('-show');
  });
};

document.addEventListener('readystatechange', function (event) {
  if (event.target.readyState === 'complete') navSection();
});