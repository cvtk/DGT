function hasClass(el, cl) {
  return (' ' + el.className + ' ').indexOf(' ' + cl + ' ') > -1;
}

function _q(selector) {
  if ( !selector && typeof(selector) !== 'string' ) return false;

  var nodeList = document.querySelectorAll(selector),
      array = Array.prototype.slice.call(nodeList);

  if ( !array.length ) return false;

  var addWord = function(str, word) {
    return str + ' ' + word;
  };

  var removeWord = function(str, word) {
    var words = str.split(/\s+/);
    return words.filter(function(w) {
      return w !== word;
    }).join(' ');
  };

  var hasClass = function(el, cl) {
    return !!~el.className.split(/\s+/).indexOf(cl);
  };

  var addClass = function(cl) {
    array.forEach(function(el) {
      if ( !hasClass(el, cl) ) {
        el.className = addWord(el.className, cl);
      }
    });
  };

  var removeClass = function(cl) {
    array.forEach(function(el) {
      if ( hasClass(el, cl) ) {
        el.className = removeWord(el.className, cl);
      }
    });
  };

  var toggleClass = function(cl) {
    array.forEach(function(el) {
      if ( hasClass(el, cl) ) {
        el.className = removeWord(el.className, cl);
      }
      else {
        el.className = addWord(el.className, cl);
      }
    });
  };

  var addEvent = function(event, handler) {
    array.forEach(function(el) {
      el.addEventListener(event, handler);
    });
  };

  var clickFire = function() {
    array.forEach(function(el) {
      var ev = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      var canceled = !el.dispatchEvent(ev);
    });
  };

  return {
    nodeList: nodeList,
    first: array[0],
    array: array,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    click: function(handler) {
      if ( typeof(handler) === 'undefined' ) return clickFire();
      return addEvent('click', handler);
    }
  };
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

(function() {
  var feedback = _q('.feedback'),
      feedbackToggler = _q('.nav-actions__link._request'),
      feedbackClose = _q('.feedback__close'),
      overlay = _q('.overlay');

  overlay.click(function(e) {
    feedback.removeClass('feedback_visible');
  });

  feedbackToggler.click(function(e) {
    e.preventDefault();
    feedback.toggleClass('feedback_visible');
  });

  feedbackClose.click(function() {
    feedback.removeClass('feedback_visible');
  });
})();

(function() {
  function httpGet(url, error, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.withCredentials = true;
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || (xhr.status === 0 && xhr.responseText !== '')) {
          callback({
            url: url,
            status: 200,
            body: xhr.responseText || ''
          });
        }
        else {
          error({
            url: url,
            status: xhr.status,
            body: xhr.responseText || ''
          });
        }
      }
    };
    xhr.send();
  }
  function arrToUrl(arr) {
    var pairs = [];
    for (var key in arr)
      if (arr.hasOwnProperty(key))
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(arr[key]));
    return pairs.join('&');
  }
  function currentTime() { return Math.floor(Date.now() / 1000); }
  function secondsHasPassed(loadedAt, currentTime) { return currentTime - loadedAt; }
  function isFulfilled(el) {
    if ( el.type === 'checkbox' ) { return el.checked; }
    else { return !!el.value; }
  }
  function isRequired(name) {
    return ( ['name', 'email', 'personal'].indexOf(name) !== -1 );
  }

  var loadedAt = currentTime(),
      threshold = 3,
      requiredFields = ['name', 'email', 'personal'];


  _q('.form-block__button').click(function(e) {
    e.preventDefault();
    var id = e.target.dataset.frm,
        form = '#' + id;

    var fields = _q(form + ' input').array.reduce(function(obj, fld) {
      obj[fld.name] = ( fld.type === 'checkbox' )? fld.checked: fld.value;
      return obj;
    }, {});

    fields.message = _q(form + ' textarea').first.value;

    var timeCheckPassed = ( secondsHasPassed(loadedAt, currentTime()) > threshold );

    var fieldCheckPassed = requiredFields.reduce(function(res, req) {
      var info = _q(form + ' [name=' + req + '] ~ .form-block__info');
      if (!fields.hasOwnProperty(req) || !fields[req]) {
        info.addClass('form-block__info_visible');
        return false;
      }
      else {
        info.removeClass('form-block__info_visible');
        return res && true;
      }
    }, true);

    var hideFieldCheckPassed = !fields.companies;

    if ( fieldCheckPassed ) {
      if ( timeCheckPassed && hideFieldCheckPassed ) {
        var url = '/s.php?' + arrToUrl(fields);
        httpGet(url, 
          function(url, status, body) {
            _q('.form-block__complete-message').first.HTML="Ошибка: " + status + " <br><br>Сообщение: " + body;
          },
          function(url, status, body) {
            _q(form).addClass('form-block_complete');
          });
      }
      else {
        _q(form).addClass('form-block_complete');
      }
    }
  });
})();