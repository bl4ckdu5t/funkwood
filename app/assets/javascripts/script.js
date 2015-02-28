var ready = function(){
	$('.account-header > svg').click(function(){
		$(this).toggleClass('active');
		$('.account-settings').toggle();
	})
};
// Ready Pages
$(document).ready(ready);
// Turbolinks
$(document).on('page:load', ready);