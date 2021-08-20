try {
  const filterizr = new Filterizr('.filter-container');

  const webDevelopmentCount = $('.filtr-item[data-category=web-development]').length;
  const dataScienceCount = $('.filtr-item[data-category=data-science]').length;
  
  const category = {
    'web-development': webDevelopmentCount,
    'data-science': dataScienceCount,
    'all': webDevelopmentCount + dataScienceCount
  };

  $('.project-count').html(category['all']);

  $('#portfolio .btn').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.project-count').html(category[$(this).data('filter')])
  });
} catch {}

// Smooth scrolling
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function() {
  if ( location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname ) {
    let target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 1000);
      return false;
    }
  }
});

// Typing animation
(function() {
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 100 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (! this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  window.onload = function() {
    var elements = document.querySelectorAll('.masthead-subheading span');
    var toRotate = ['Web Developer', 'Data Scientist'];
    var period = 2000;
    elements.forEach(function(element) {
      new TxtRotate(element, toRotate, period);
    });
  };
})();

$(window).on('scroll', function() {
  // Collapse navbar if page is not at top
  $('.navbar').offset().top > 100 ?
    $('.navbar').addClass('navbar-shrink') :
    $('.navbar').removeClass('navbar-shrink');

  // Progress bars animation
  $('.progress-bar').each(function() {
    const bottomOfObject = $(this).offset().top + $(this).outerHeight();
    const bottomOfWindow = $(window).scrollTop() + $(window).height();
    const percentage = $(this).attr('aria-valuenow');
    
    (bottomOfWindow > bottomOfObject) && $(this).css('width', percentage + '%');
  });
});