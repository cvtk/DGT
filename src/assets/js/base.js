function hasClass(el, cl) {
  return (' ' + el.className + ' ').indexOf(' ' + cl + ' ') > -1;
}

function tinySwipe(args) {
  if ( typeof args !== 'object' && !args.hasOwnProperty('container') ) return;

  var isRepeated = false,
      touchX = null,
      touchY = null;

  function preventRepeate(delay, callback) {
    delay = delay || 250;
    if ( isRepeated ) { return false; }

    isRepeated = true;

    setTimeout(function() {
      isRepeated = false;
    }, delay);

    return callback();
  }

  function queryBySelectorAll(selector) {
    return Array.prototype.slice.call( document.querySelectorAll(selector) );
  }

  function addEventToArray(array, event, handler) {
    if ( !array.length ) return;
    array.forEach(function(item) {
      item.addEventListener(event, handler);
    });
  }

  function onMouseDown(e) {
    touchX = e.clientX;
    touchY = e.clientY;
  }

  function onMouseUp(e) {
    touchX = null;
    touchY = null;
  }

  function onMouseMove(e) {
    return preventRepeate(50, function() {
      if ( !touchX || !touchY ) { return; }
      var deltaX = touchX - e.clientX,
          deltaY = touchY - e.clientY;
      if ( Math.abs(deltaX) > Math.abs(deltaY) ) {
        if ( deltaX > 0 ) { self.nextSlide(); }
        else { self.prevSlide(); }
      }
      touchX = null;
      touchY = null;
    });
  }

  function onTouchStart(e) {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }

  function onTouchMove(e) {
    return preventRepeate(500, function() {
      if ( !touchX || !touchY ) { return; }
      var deltaX = touchX - e.touches[0].clientX,
          deltaY = touchY - e.touches[0].clientY;
      if ( Math.abs(deltaX) > Math.abs(deltaY) ) {
        if ( deltaX > 0 ) { self.nextSlide(); }
        else { self.prevSlide(); }
      }
      touchX = null;
      touchY = null;
    });
  }

  function onWheel(e) {
    e.preventDefault();
    return preventRepeate(350, function() {
      var delta = e.deltaY || e.detail || e.wheelDelta;
      if ( delta > 0 ) { self.nextSlide(); }
      else { self.prevSlide(); }
    });
  }

  function setSlide(slide) {
    if ( slide >= 0 && slide <= slides.length ) {
      self.currentSlide = slide;
      if ( args.hasOwnProperty('navButtons') ) {
        navs.forEach(function(nav) {
          if ( nav.dataset.jt == slide ) {
            nav.classList.add('_active');
          }
          else {
            nav.classList.remove('_active');
          }
        });
      }
      container.style.left = -1 * slides[slide].offsetLeft + 'px';
    }
  }

  var self = this,
      container = document.querySelector(args.container),
      slides = queryBySelectorAll(args.container + '>*'),
      navs = null;

  if ( !container || !slides ) return;

  this.currentSlide = 0;

  this.to = function(e) {
    setSlide(e.target.dataset.jt);
  };

  this.nextSlide = function() {
    if ( self.currentSlide >= slides.length - 1 ) return;
    setSlide(++self.currentSlide);
  };

  this.prevSlide = function() {
    if ( !self.currentSlide ) return;
    setSlide(--self.currentSlide);
  };

  // init slider
  container.style.width = slides.reduce(function(result, current) {
    result += current.offsetWidth;
    current.style.width = current.offsetWidth + 'px';
    return result;
  }, 0) + 'px';

  if ( args.hasOwnProperty('navButtons') ) {
    navs = queryBySelectorAll(args.navButtons);
    addEventToArray( navs, 'click', this.to );
  }

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

  container.addEventListener('touchstart', onTouchStart, false);        
  container.addEventListener('touchmove', onTouchMove, false);
  container.addEventListener('mousedown', onMouseDown, false);
  container.addEventListener('mouseup', onMouseUp, false);       
  container.addEventListener('mousemove', onMouseMove, false);
}

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