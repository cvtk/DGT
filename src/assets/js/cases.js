(function() {
  var currentFilter = '',
      navItems = _q('.cases-content-nav-item');

  navItems.click(function() {
    var filter = this.dataset.filter;

    if ( filter === currentFilter ) {
      navItems.removeClass('_current');
        _q('.cases-content-list__item').array.forEach(function(el) {
          el.style.display = 'block';
        });
      currentFilter = '';
      return;
    }
    
    currentFilter = filter;
    navItems.removeClass('_current');
    this.classList.add('_current');
    _q('.cases-content-list__item').array.forEach(function(el) {
      el.style.display = ( el.dataset.year == filter )? 'block': 'none';
    });
  });
})();