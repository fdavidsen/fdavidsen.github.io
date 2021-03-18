/*!
 * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length
        ? target
        : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate({
          scrollTop: target.offset().top - 72
        }, 1000, "easeInOutExpo");
        // return false => hide id (url)
        return true;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").on('click', function() {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 74,
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };

  // Collapse now if page is not at top
  navbarCollapse();

  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict



// Changing URL on scroll
$(function() {
  var currentHash = "#";
  var blocksArr = $('section');

  $(document).scroll(function() {
    var currentTop = window.pageYOffset / 1;

    for (var i = 0; i < blocksArr.length; i++) {
      var hash = $(blocksArr[i]).attr('id');
      var currentElementTop = $(blocksArr[i]).offset().top - 72.5;

      if (currentElementTop < currentTop && currentTop < currentElementTop + $(blocksArr[i]).height() && currentHash != hash) {
        if (history.pushState) {
          history.pushState(null, null, '#' + hash);
        } else {
          location.hash = '#' + hash;
        }

        currentHash = hash;
      }
    }
  });
});

// Portfolio category filter
$('.tabs-icon').on('click', 'li', function() {
  $(this).addClass('active').siblings().removeClass('active');
  const tab = $(this).data('tab').split('-').join(' ');
  let hidden = 0;

  $('.portfolio #portfolio .row').children().each(function() {
    if (tab == 'all') {
      $(this).fadeIn();
    } else {
      const type = $(this).find('.portfolio-caption-subheading').html().toLowerCase();
      if (type == tab) {
        $(this).fadeIn();
      } else {
        $(this).hide();
        hidden += 1;
      }
    }
  });

  $('#total').html(total - hidden);
});

// Progress bars animation
$(window).on('load scroll', function() {
  $('.progress-bar').each(function() {
    const bottomOfObject = $(this).offset().top + $(this).outerHeight();
    const bottomOfWindow = $(window).scrollTop() + $(window).height();
    const percentage = $(this).attr('aria-valuenow');
    
    if (bottomOfWindow > bottomOfObject)    $(this).css('width', percentage + '%');
  });
});