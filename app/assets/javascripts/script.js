var ready = function(){
	$('.account-header > svg').click(function(){
		$(this).toggleClass('active');
		$('.account-settings').toggle();
	});
	$('#js-register').click(function(e){
		e.preventDefault();
		bake_cookie('visitor_name', $('#js-name').val());
		bake_cookie('visitor_age', $('#js-age').val());
		bake_cookie('visitor_gender', $('#js-gender').val());
		var destination = window.location.protocol + '//' + window.location.host + '/users/sign_up';
		window.location.replace(destination);
	});
};
// Ready Pages
$(document).ready(ready);
// Turbolinks
$(document).on('page:load', ready);

function bake_cookie(name, value) {
  var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}
function read_cookie(name) {
	var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
	result && (result = JSON.parse(result[1]));
	return result;
}