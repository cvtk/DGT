function hasClass(el, cl) {
  return (' ' + el.className + ' ').indexOf(' ' + cl + ' ') > -1;
}

(function() {
  var logo = document.querySelector('.logo'),
      feedback = document.querySelector('.feedback'),
      feedbackToggler = document.querySelector('.nav-actions__link'),
      feedbackClose = document.querySelector('.feedback__close'),
      close = document.querySelector('.nav__close'),
      nav = document.querySelector('.nav'),
      info = document.querySelector('.info'),
      overlay = document.querySelector('.overlay');

  var showNav = function() {
    nav.classList.add('nav_visible');
    info.classList.add('info_visible');
    overlay.classList.add('overlay_visible');
  };

  var hideNav = function() {
    nav.classList.remove('nav_visible');
    info.classList.remove('info_visible');
    overlay.classList.remove('overlay_visible');
    feedback.classList.remove('feedback_visible');
  };

  feedbackToggler.addEventListener('click', function() {
    feedback.classList.toggle('feedback_visible');
  });

  feedbackClose.addEventListener('click', function() {
    feedback.classList.remove('feedback_visible');
  });

  close.addEventListener('click', hideNav);
  overlay.addEventListener('click', hideNav);
  logo.addEventListener('click', showNav);
})();