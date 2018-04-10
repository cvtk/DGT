(function() {
  var navs = document.querySelectorAll('.index-content-services-body__item'),
      wrapper = document.querySelector('.index-content-services-description__wrapper'),
      articles = document.querySelectorAll('.index-content-services-description__item');

  function removeActiveClasses() {
    [].forEach.call(navs, function(nav) {
      nav.classList.remove('_active');
    });
  }

  [].forEach.call(navs, function(nav) {
    nav.addEventListener('click', function() {
      var target = this.dataset.target;
      removeActiveClasses();
      this.classList.add('_active');
      wrapper.style.left = -1 * articles[target - 1].offsetLeft + 'px';
    });
  });

})();