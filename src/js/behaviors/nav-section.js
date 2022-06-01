const navSection = () => {
    const overlay = document.querySelector( '[data-js-overlay]' );
    const menuBtn = document.querySelector( '[data-js-menu-btn]' );
    const closeBtn = document.querySelector( '[data-js-close-btn]' );
    const navSection = document.querySelector( '[data-js-nav-section]' );
    const shoppingList = document.querySelector( '[data-js-shopping-cart]' );
    
    menuBtn.addEventListener('click', ( event ) => {
        shoppingList.classList.remove( '-show' );
        navSection.classList.toggle( '-expand' );
        overlay.classList.add( '-show' );
    });

    // Close offsite navigation.
    closeBtn.addEventListener('click', ( event ) => {
        navSection.classList.toggle( '-expand' );
        overlay.classList.remove( '-show' );
    });
};

document.addEventListener('readystatechange', ( event ) => {
    if ( event.target.readyState === 'complete' ) navSection();
});
