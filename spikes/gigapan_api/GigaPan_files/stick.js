// stick.js (jQuery plugin)
//
// Original author: Jim Garrison <jim@jimgarrison.org>
//
//
// This jQuery plugin "sticks" the first element of the wrapped set to the
// top of the viewport when you scroll down past it.
//
// $("#element_id").stick();
// $("#element_id").stick(-5);
//
// The one optional argument provides an offset (i.e., how many pixels from
// the top of the screen the element should remain).  It defaults to 0.

(function($) {
  $.fn.stick = function (offset) {
    var stuck = false;
    var elt = $(this[0]);
    var horizontal_scroll_positioning_enabled = false;

    if (offset === undefined)
      offset = 0;

    // wrap the element in a <div>, which seems to be necessary for it to
    // work correctly with borderize.js on IE7
    elt.wrap("<div></div>");
    elt = elt.parent();

    // create wrapper <div>, which will always stay in place
    elt.wrap("<div></div>");
    var wrapper = elt.parent();

    elt.css("top", offset + "px"); // fixme: if the window height is not high, we
                                   // should set this to some negative value

    function do_stick() {
      // make the wrapper <div> the same dimensions as the element
      // we are about to remove so nothing moves around on the page
      wrapper.width(elt.width()).height(elt.height());

      // explicitly set the dimensions of the element so they don't change
      elt.width(elt.width()).height(elt.height());

      // fixed positioning
      elt.css("position", "fixed");

      stuck = true;
    }

    function do_unstick() {
      // change it back to static positioning
      elt.css("position", "static");

      // remove inline styles to restore natural CSS width/height
      wrapper.css({width: "", height: ""});
      elt.css({width: "", height: ""});

      stuck = false;
    }

    function onscroll() {
      if (wrapper.offset().top < $(window).scrollTop() + offset) {
        if (!stuck)
          do_stick();

        // we have to explicitly move the fixed element upon horizontal scroll
        if ($(window).scrollLeft() > 0) {
          elt.css("left", (wrapper.offset().left - $(window).scrollLeft()) + "px");
          horizontal_scroll_positioning_enabled = true;
        } else if (horizontal_scroll_positioning_enabled) {
          elt.css("left", "");
          horizontal_scroll_positioning_enabled = false;
        }
      } else {
        if (stuck) {
          do_unstick();

          // reset horizontal scroll handling
          if (horizontal_scroll_positioning_enabled) {
            elt.css("left", "");
            horizontal_scroll_positioning_enabled = false;
          }
        }
      }
    }

    $(window).scroll(onscroll);
    onscroll();

    return this;
  };
})(jQuery);

