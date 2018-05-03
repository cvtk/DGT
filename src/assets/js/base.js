function hasClass(el, cl) {
  return (' ' + el.className + ' ').indexOf(' ' + cl + ' ') > -1;
}

function tinySwipe(args) {
  if ( typeof args !== 'object' && !args.hasOwnProperty('container') ) return;

  function queryBySelectorAll(selector) {
    return Array.prototype.slice.call( document.querySelectorAll(selector) );
  }

  function addEventToArray(array, event, handler) {
    if ( !array.length ) return;
    array.forEach(function(item) {
      item.addEventListener(event, handler);
    });
  }

  function onWheel(e) {
    var delta = e.deltaY || e.detail || e.wheelDelta;
    if ( delta > 0 ) { self.nextSlide(); }
    else { self.prevSlide(); }
    e.preventDefault();
  }

  var self = this,
      container = document.querySelector(args.container),
      slides = Array.prototype.slice.call( document.querySelectorAll(args.container + '>*') );

  if ( !container || !slides ) return;

  this.currentSlide = 0;

  this.nextSlide = function() {
    if ( self.currentSlide >= slides.length - 1 ) return;
    container.style.left = -1 * slides[++self.currentSlide].offsetLeft + 'px';
  };

  this.prevSlide = function() {
    if ( !self.currentSlide ) return;
    container.style.left = -1 * slides[--self.currentSlide].offsetLeft + 'px';
  };

  // init slider
  container.style.width = slides.reduce(function(result, current) {
    result += current.offsetWidth;
    current.style.width = current.offsetWidth + 'px';
    return result;
  }, 0) + 'px';

  if ( args.hasOwnProperty('next') ) {
    addEventToArray( queryBySelectorAll(args.next), 'click', this.nextSlide );
  }

  if ( args.hasOwnProperty('previos') ) {
    addEventToArray( queryBySelectorAll(args.previos), 'click', this.prevSlide );
  }

  if ( args.hasOwnProperty('onWheel') ) {
    if (container.addEventListener) {
      if ('onwheel' in document) {
        container.addEventListener("wheel", onWheel);
      } else if ('onmousewheel' in document) {
        container.addEventListener("mousewheel", onWheel);
      } else {
        container.addEventListener("MozMousePixelScroll", onWheel);
      }
    } else {
      container.attachEvent("onmousewheel", onWheel);
    }
  }
}

var swipe = new tinySwipe({
  container: '.index-content-reviews-content-slider',
  next: '.index-content-reviews-content-slider-item-footer-nav__next',
  previos: '.index-content-reviews-content-slider-item-footer-nav__prev'
});

(function() {
  var feedback = document.querySelector('.feedback'),
      feedbackToggler = document.querySelector('.nav-actions__link'),
      feedbackClose = document.querySelector('.feedback__close');

  feedbackToggler.addEventListener('click', function() {
    feedback.classList.toggle('feedback_visible');
  });

  feedbackClose.addEventListener('click', function() {
    feedback.classList.remove('feedback_visible');
  });
})();