(function() {
  var navs = document.querySelectorAll('.services-btn'),
      pages = document.querySelectorAll('.services-content__page'),
      feedbackToggler = document.querySelector('.services-feedback__header-block'),
      feedback = document.querySelector('.feedback'),
      feedbackClose = document.querySelector('.feedback__close'),
      overlay = document.querySelector('.overlay'),
      currentPage = 0,
      isWheeling = false;

  function scrollTo(to, duration) {
    if ( duration <= 0 ) return;
    var difference = to.offsetTop - document.documentElement.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      document.documentElement.scrollTop = document.documentElement.scrollTop + perTick;
      if ( document.documentElement.scrollTop === to.offsetTop ) {
        var ctgr = to.dataset.ctgr,
            nav = document.querySelector('[data-ctn="' + ctgr + '"]');
        window.location.hash = ctgr;
        removeActiveClasses();
        nav.classList.add('services-btn_active');
        return;
      }
      scrollTo(to, duration - 10);
    }, 10);
  }

  function showFeedbackForm() {
    if ( !hasClass(feedback, 'feedback_visible_right') ) {
      feedback.classList.add('feedback_visible_right');
      overlay.classList.add('overlay_visible');
    }
  }

  function hideFeedbackForm() {
    if ( hasClass(feedback, 'feedback_visible_right') ) {
      feedback.classList.remove('feedback_visible_right');
      overlay.classList.remove('overlay_visible');
    }
  }

  function removeActiveClasses() {
    [].forEach.call(navs, function(nav) {
      nav.classList.remove('services-btn_active');
    });
  }

  function onWheel(e) {
    e.preventDefault();

    var scrollSpeed = 250;

    if ( isWheeling ) return false;

    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;
  
    if ( delta > 0 && currentPage < pages.length - 1 ) {
      scrollTo(pages[++currentPage], scrollSpeed);
    } else if ( delta < 0 && currentPage > 0 ) {
      scrollTo(pages[--currentPage], scrollSpeed);
    }

    isWheeling = true;

    setTimeout(function() {
      isWheeling = false;
    }, scrollSpeed);
    
    return false;
  }

  [].forEach.call(navs, function(nav) {
    nav.addEventListener('click', function() {
      var ctn = this.dataset.ctn,
          target = document.querySelector('[data-ctgr="' + ctn + '"]');
      scrollTo( target, 250 );
      removeActiveClasses();
      this.classList.add('services-btn_active');
      currentPage = [].reduce.call(pages, function(res, cur, i) {
        return ( cur.dataset.ctgr ===  ctn) ? i : res;
      }, 0);
    });
  });
  
  feedbackToggler.addEventListener('click', showFeedbackForm);
  feedbackClose.addEventListener('click', hideFeedbackForm);

  if (window.addEventListener) {
    if ('onwheel' in document) {
      window.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      window.addEventListener("mousewheel", onWheel);
    } else {
      window.addEventListener("MozMousePixelScroll", onWheel);
    }
  } else {
    window.attachEvent("onmousewheel", onWheel);
  }

  var hash = window.location.hash.split('#')[1];

  if ( hash ) {
    var target = document.querySelector('[data-ctgr="' + decodeURIComponent(hash) + '"]');
    scrollTo( target, 250 );
    currentPage = [].reduce.call(pages, function(res, cur, i) {
        return ( cur.dataset.ctgr ===  target.dataset.ctgr) ? i : res;
      }, 0);
  } else { scrollTo( pages[currentPage], 1 ); }

})();