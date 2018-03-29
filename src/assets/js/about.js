(function() {
  var pages = document.querySelectorAll('.about-content'),
      navs = document.querySelectorAll('.about-content-info__scroll-button'),
      currentPage = 0,
      isWheeling = false;

  function scrollTo(to, duration) {
    if ( duration <= 0 ) return;
    var difference = to.offsetTop - document.documentElement.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      document.documentElement.scrollTop = document.documentElement.scrollTop + perTick;
      if ( document.documentElement.scrollTop === to.offsetTop ) {
        //TODO add callback on end transition
        return;
      }
      scrollTo(to, duration - 10);
    }, 10);
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

  [].forEach.call(navs, function(nav) {
    nav.addEventListener('click', function() {
      if ( currentPage < pages.length - 1 ) {
        scrollTo( pages[++currentPage], 250 );
      } else {
        scrollTo( pages[--currentPage], 250 );
      }
    });
  });
})();