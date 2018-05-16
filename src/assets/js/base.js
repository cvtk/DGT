function hasClass(el, cl) {
  return (' ' + el.className + ' ').indexOf(' ' + cl + ' ') > -1;
}

// function _q(selector) {
//   if ( !selector && typeof(selector) !== 'string' ) return;

//   var nodeList = document.querySelectorAll(selector),
//       array = Array.prototype.slice.call(nodeList);

//   if ( !array.length ) return;

//   var containsClass = function(el, cl) {
//     return !!~el.className.split(/\s+/).indexOf(cl);
//   };

//   var addClass = function(cl) {
//     array.forEach(function(el) {
//       if ( !containsClass(el, cl) ) {
//         el.className += ' ' + cl;
//       }
//     });
//   };

//   var toggleClass = function(el, cl) {
//     array.forEach(function(el) {
//       if ( containsClass(el, cl) ) {
//         var classes = el.className.split(/\s+/),
//             index = classes.indexOf(cl);

//         el.className = classes.splice(index, 1).join(' ');
//       }
//       else {
//         el.className += ' ' + cl;
//       };
//     });
//   };

//   var removeClass = function(cl) {
//     array.forEach(function(el) {
//       if ( containsClass(el, cl) ) {
//         var classes = el.className.split(/\s+/),
//             index = classes.indexOf(cl);
//         el.className = classes.splice(index, 1).join(' ');
//       }
//     })
//   }

//   var addEvent = function(event, handler) {
//     array.forEach(function(el) {
//       el.addEventListener(event, handler);
//     });
//   };

//   return {
//     nodeList: nodeList,
//     array: array,
//     addClass: 
//     click: function(handler) { return addEvent('click', handler); }
//   };
// }

function queryBySelectorAll(selector) {
  return Array.prototype.slice.call( document.querySelectorAll(selector) );
}

function addEventToArray(array, event, handler) {
  if ( !array.length ) return;
  array.forEach(function(item) {
    item.addEventListener(event, handler);
  });
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

// (function() {
//   var feedback = _q('.feedback'),
//       feedbackToggler = _q('.nav-actions__link'),
//       feedbackClose = _q('.feedback__close');

//   feedbackToggler.click(function() {
//     feedback.toggleClass('feedback_visible');
//   });

//   feedbackClose.click(function() {
//     feedback.removeClass('feedback_visible');
//   });
// })();

// (function() {
//   function currentTime() { return Math.floor(Date.now() / 1000); }
//   function secondsHasPassed(loadedAt, currentTime) { return currentTime - loadedAt; }
//   function isFulfilled(el) {
//     if ( el.type === 'checkbox' ) { return el.checked; }
//     else { return !!el.value; }
//   }
//   function isRequired(name) {
//     return ( ['name', 'email', 'personal'].indexOf(name) !== -1 );
//   }

//   var loadedAt = currentTime();
//   var threshold = 15;
//   var fields = query('.feedback-block input');

//   query('.feedback-block-form-button').click(function(e) {
//     e.preventDefault();

//     fields.array.forEach(function(el) {
//       if ( isRequired(el.name) && !isFulfilled(el) ) {
//         console.log('Поле ' + el.placeholder + ' не может быть пустым');
//       }
//     });

//     var timeCheckPassed = ( secondsHasPassed(loadedAt, currentTime()) > threshold ),
//         fieldCheckPassed = ( 1 === 1 );

//     if ( timeCheckPassed && fieldCheckPassed )
//       { console.log('Yep!', secondsHasPassed(loadedAt, currentTime())); }
//   });
// })();