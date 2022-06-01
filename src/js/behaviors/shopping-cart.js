const shoppingCart = () => {
    const cartBtn = document.querySelector( '[data-js-cart-btn]' );
    const checkoutBtn = document.querySelector( '[data-js-checkout-btn]' );
    const shoppingList = document.querySelector( '[data-js-shopping-cart]' );
    
    cartBtn.addEventListener('click', ( event ) => {
        shoppingList.classList.toggle( '-show' );
    });

    checkoutBtn.addEventListener('click', ( event ) => {
        shoppingList.classList.toggle( '-show' );
    });
};

document.addEventListener('readystatechange', ( event ) => {
    if ( event.target.readyState === 'complete' ) shoppingCart();
});
