const lightbox = () => {
    const template = document.querySelector( '[data-js-lightbox-template]' );
    const carousel = template.content.cloneNode(true).children[0];

    const overlay = document.querySelector( '[data-js-overlay-lightbox]' );
    const lightboxBtns = document.querySelectorAll( '[data-js-lightbox-btn]' );
    const closeBtn = carousel.querySelector( '[data-js-close-btn]' );

    // trigger lightbox
    lightboxBtns.forEach(( btn ) => {
        btn.addEventListener('click', ( event ) => {

            // displays overlay
            overlay.classList.add( '-show' );
            overlay.appendChild( carousel );

            // carousel
            const prevBtn = carousel.querySelector( '[data-js-prev-btn] ');
            const nextBtn = carousel.querySelector( '[data-js-next-btn]' );
            const slider = carousel.querySelector( '[data-js-slider]' );
            
            const slides = Array.from( slider.children );
            
            const thumbnails = carousel.querySelector( '[data-js-thumbnails]' );
            const btns = Array.from( thumbnails.children );
            
            // get width of the first slide
            const sliderWidth = slides[0].getBoundingClientRect().width;
            
            // dynamically arrange the slides next to each other
            const setSlidePosition = ( slide, index ) => {
                slide.style.left = `${ sliderWidth * index }px`;
            };
            
            slides.forEach( setSlidePosition );
            
            const moveToSlide = ( slider, currentSlide, targetSlide ) => {
                slider.style.transform = `translateX( -${ targetSlide.style.left } )`;
                currentSlide.removeAttribute( 'data-js-current-slide' );
                targetSlide.setAttribute( 'data-js-current-slide', '' );
            };
            
            const updateThumbnails = ( currentBtn, targetBtn ) => {
                currentBtn.removeAttribute( 'data-js-current-slide' );
                currentBtn.classList.remove( '-active' );
                
                targetBtn.setAttribute( 'data-js-current-slide', '' );
                targetBtn.classList.add( '-active' );
            };
            
            // hide / show arrows
            const displayArrows = ( slides, prevBtn, nextBtn, targetIndex ) => {
                // first item
                if ( targetIndex === 0 ) {
                    nextBtn.classList.add( '-hidden' );
                    prevBtn.classList.remove( '-hidden' );
                } 
                
                // last item
                else if ( targetIndex === ( slides.length - 1 ) ) {
                    nextBtn.classList.remove( '-hidden' );
                    prevBtn.classList.add( '-hidden' );
                }
            
                // in-between items
                else { 
                    prevBtn.classList.remove( '-hidden' );
                    nextBtn.classList.remove( '-hidden' );
                }
            };
            
            // when I click left, move slides to the left
            nextBtn.addEventListener('click', (event) => {
                event.preventDefault();
            
                const currentSlide = slider.querySelector( '[data-js-current-slide]' );
                const nextSlide = currentSlide.nextElementSibling;
            
                // get the index number from the next slide
                const nextIndex = slides.findIndex( slide => slide === nextSlide );
            
                const currentBtn = thumbnails.querySelector( '[data-js-current-slide]' );
                const nextThumbnailBtn = currentBtn.nextElementSibling;
            
                // move to the next slide
                moveToSlide( slider, currentSlide, nextSlide );
            
                // update thumbnails
                updateThumbnails( currentBtn, nextThumbnailBtn );
            
                // update buttons
                displayArrows( slides, nextBtn, prevBtn, nextIndex );
            });
            
            // when I click right, move slides to the right
            prevBtn.addEventListener('click', (event) => {
                event.preventDefault();
            
                const currentSlide = slider.querySelector( '[data-js-current-slide]' );
                const prevSlide = currentSlide.previousElementSibling;
            
                // get the index number from the previous slide
                const prevIndex = slides.findIndex( slide => slide === prevSlide );
            
                const currentBtn = thumbnails.querySelector( '[data-js-current-slide]' );
                const prevThumbnailBtn = currentBtn.previousElementSibling;
            
                // move to the previous slide
                moveToSlide( slider, currentSlide, prevSlide );
            
                // update thumbnails
                updateThumbnails( currentBtn, prevThumbnailBtn );
            
                // update buttons
                displayArrows( slides, nextBtn, prevBtn, prevIndex );
            });
            
            // when I click thumbnail indicators, move to that slide
            thumbnails.addEventListener('click', (event) => {
            
                // what button was clicked on?
                const targetBtn = event.target.closest('button');
            
                if ( !targetBtn ) return;
            
                const currentSlide = slider.querySelector( '[data-js-current-slide]' );
                const currentBtn = thumbnails.querySelector( '[data-js-current-slide]' );
                const targetIndex = btns.findIndex( btn => btn === targetBtn );
            
                const targetSlide = slides[ targetIndex ];
            
                // move to the target slide
                moveToSlide( slider, currentSlide, targetSlide );
            
                // update thumbnails
                updateThumbnails( currentBtn, targetBtn );
            
                // update buttons
                displayArrows( slides, nextBtn, prevBtn, targetIndex );
            });
        });
    });

    // Close offsite navigation.
    closeBtn.addEventListener('click', ( event ) => {
        overlay.classList.remove( '-show' );
    });
};

document.addEventListener('readystatechange', ( event ) => {
    if (event.target.readyState === 'complete') lightbox();
});
