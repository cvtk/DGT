(function() {
	if ( !_q('.contacts-content') ) return;
  var menuToggler = _q('.menu-toggler'),
      feedbackForm = _q('.feedback');

  _q('.js__feedback_toggler').click(function(e) {
    menuToggler.first.checked = true;
    feedbackForm.addClass('feedback_visible');
  });
})();