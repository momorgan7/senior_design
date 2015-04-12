// borderize.js (jQuery plugin)
//
// Original author: Jim Garrison <jim@jimgarrison.org>
//
//
// This jQuery plugin wraps each element of the wrapped set in a translucent
// border.  It then returns a new wrapped set, containing the border of each
// element in place of the element itself.
//
// (requires borderize.css)

(function ($) {
  $.fn.borderize = function () {
    return this.each(function () {
      var wrapper = $('<table class="borderize"><tr><td class="borderize_nw"></td><td class="borderize_n"></td><td class="borderize_ne"></td></tr><tr><td class="borderize_w"></td><td class="borderize_content"></td><td class="borderize_e"></td></tr><tr><td class="borderize_sw"></td><td class="borderize_s"></td><td class="borderize_se"></td></tr></table>');
      $(this).replaceWith(wrapper).appendTo(wrapper.find('.borderize_content'));
    }).closest('.borderize'); // return a new wrapped set including the borders
  };
})(jQuery);

