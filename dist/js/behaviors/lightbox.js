"use strict";

var lightbox = function lightbox() {
  var template = document.querySelector('[data-js-lightbox-template]');
  var carousel = template.content.cloneNode(true).children[0];
  var overlay = document.querySelector('[data-js-overlay-lightbox]');
  var lightboxBtns = document.querySelectorAll('[data-js-lightbox-btn]');
  var closeBtn = carousel.querySelector('[data-js-close-btn]'); // trigger lightbox

  lightboxBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      // displays overlay
      overlay.classList.add('-show');
      overlay.appendChild(carousel); // carousel

      var prevBtn = carousel.querySelector('[data-js-prev-btn] ');
      var nextBtn = carousel.querySelector('[data-js-next-btn]');
      var slider = carousel.querySelector('[data-js-slider]');
      var slides = Array.from(slider.children);
      var thumbnails = carousel.querySelector('[data-js-thumbnails]');
      var btns = Array.from(thumbnails.children); // get width of the first slide

      var sliderWidth = slides[0].getBoundingClientRect().width; // dynamically arrange the slides next to each other

      var setSlidePosition = function setSlidePosition(slide, index) {
        slide.style.left = "".concat(sliderWidth * index, "px");
      };

      slides.forEach(setSlidePosition);

      var moveToSlide = function moveToSlide(slider, currentSlide, targetSlide) {
        slider.style.transform = "translateX( -".concat(targetSlide.style.left, " )");
        currentSlide.removeAttribute('data-js-current-slide');
        targetSlide.setAttribute('data-js-current-slide', '');
      };

      var updateThumbnails = function updateThumbnails(currentBtn, targetBtn) {
        currentBtn.removeAttribute('data-js-current-slide');
        currentBtn.classList.remove('-active');
        targetBtn.setAttribute('data-js-current-slide', '');
        targetBtn.classList.add('-active');
      }; // hide / show arrows


      var displayArrows = function displayArrows(slides, prevBtn, nextBtn, targetIndex) {
        // first item
        if (targetIndex === 0) {
          nextBtn.classList.add('-hidden');
          prevBtn.classList.remove('-hidden');
        } // last item
        else if (targetIndex === slides.length - 1) {
          nextBtn.classList.remove('-hidden');
          prevBtn.classList.add('-hidden');
        } // in-between items
        else {
          prevBtn.classList.remove('-hidden');
          nextBtn.classList.remove('-hidden');
        }
      }; // when I click left, move slides to the left


      nextBtn.addEventListener('click', function (event) {
        event.preventDefault();
        var currentSlide = slider.querySelector('[data-js-current-slide]');
        var nextSlide = currentSlide.nextElementSibling; // get the index number from the next slide

        var nextIndex = slides.findIndex(function (slide) {
          return slide === nextSlide;
        });
        var currentBtn = thumbnails.querySelector('[data-js-current-slide]');
        var nextThumbnailBtn = currentBtn.nextElementSibling; // move to the next slide

        moveToSlide(slider, currentSlide, nextSlide); // update thumbnails

        updateThumbnails(currentBtn, nextThumbnailBtn); // update buttons

        displayArrows(slides, nextBtn, prevBtn, nextIndex);
      }); // when I click right, move slides to the right

      prevBtn.addEventListener('click', function (event) {
        event.preventDefault();
        var currentSlide = slider.querySelector('[data-js-current-slide]');
        var prevSlide = currentSlide.previousElementSibling; // get the index number from the previous slide

        var prevIndex = slides.findIndex(function (slide) {
          return slide === prevSlide;
        });
        var currentBtn = thumbnails.querySelector('[data-js-current-slide]');
        var prevThumbnailBtn = currentBtn.previousElementSibling; // move to the previous slide

        moveToSlide(slider, currentSlide, prevSlide); // update thumbnails

        updateThumbnails(currentBtn, prevThumbnailBtn); // update buttons

        displayArrows(slides, nextBtn, prevBtn, prevIndex);
      }); // when I click thumbnail indicators, move to that slide

      thumbnails.addEventListener('click', function (event) {
        // what button was clicked on?
        var targetBtn = event.target.closest('button');
        if (!targetBtn) return;
        var currentSlide = slider.querySelector('[data-js-current-slide]');
        var currentBtn = thumbnails.querySelector('[data-js-current-slide]');
        var targetIndex = btns.findIndex(function (btn) {
          return btn === targetBtn;
        });
        var targetSlide = slides[targetIndex]; // move to the target slide

        moveToSlide(slider, currentSlide, targetSlide); // update thumbnails

        updateThumbnails(currentBtn, targetBtn); // update buttons

        displayArrows(slides, nextBtn, prevBtn, targetIndex);
      });
    });
  }); // Close offsite navigation.

  closeBtn.addEventListener('click', function (event) {
    overlay.classList.remove('-show');
  });
};

document.addEventListener('readystatechange', function (event) {
  if (event.target.readyState === 'complete') lightbox();
});