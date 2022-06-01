// https://codepen.io/dmondma/pen/OJPpWwY
jQuery(function() {

    $('[data-js-spinner-btn]').on('click', function() {
        const $input = $(this).parents('[data-js-number-spinner]').find('[data-js-spinner-number]');

        if ( $(this).hasClass('decrease-btn') ) {
            let count = parseFloat( $input.val() ) - 1;

            count = count < 1 ? 1 : count;

            if (count < 2) {
                $(this).addClass('-disabled');
            }
            else {
                $(this).removeClass('-disabled');
            }
              $input.val( count );
        }
        else {
            let count = parseFloat( $input.val() ) + 1;

            $input.val( count );

            if (count > 1) {
              $(this).parents('[data-js-number-spinner]').find(('.decrease-btn')).removeClass('-disabled');
            }
        }

        $input.trigger('change');
      
        return false;
    });    
});