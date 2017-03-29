var customScripts = {
    scrollTop: function() {

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.topHome').fadeIn();
            } else {
                $('.topHome').fadeOut();
            }
        });

    },
    scrollAnchors: function() {

        /* ---------------------------------------------- /*
         * Smooth scroll / Scroll To Top
         /* ---------------------------------------------- */

        $('a[href*=#]').bind("click", function(e) {

            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });


    },
    init: function() {
        customScripts.scrollTop();
        customScripts.scrollAnchors();
    }
};

$('document').ready(function() {

    customScripts.init();

});