'use strict';

// jQuery plugin adapted from
// http://stackoverflow.com/questions/4801655/how-to-go-to-a-specific-element-on-page
(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 400);
        return this; // for chaining...
    };
})(jQuery);

const learnMore = () => {
  $('#about').goTo();
};

module.exports = {
  learnMore,
};
