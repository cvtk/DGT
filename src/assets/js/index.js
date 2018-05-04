(function() {

new tinySwipe({
  container: '.index-content-reviews-content-slider',
  next: '.index-content-reviews-content-slider-item-footer-nav__next',
  previos: '.index-content-reviews-content-slider-item-footer-nav__prev'
});

new tinySwipe({
  container: '.index-content-services-description__wrapper',
  onWheel: true
});

if ( window.screen.availWidth <= 900 ) {

  new tinySwipe({
    container: '.index-content-reviews-banners',
    onWheel: true
  });

  new tinySwipe({
    container: '.index-content-rates-list',
    onWheel: true
  });

  new tinySwipe({
    container: '.index-content-advantage-cases',
    onWheel: true
  });
}

})();