(function( $ ) {
 
    $( document ).on( 'click', '.accordion__block .accordion__toggle', function(){
        $(this).find( '.dashicons' ).toggleClass( 'dashicons-plus-alt2 dashicons-minus' );
        $(this).closest( '.accordion__head' ).siblings( '.accordion__body' ).slideToggle();
    });
 
})(jQuery);