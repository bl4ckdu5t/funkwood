var ready = function(){
	// Submitting the preferences form
	$(document).on('submit','#js-preference-form',function(e){
		e.preventDefault();
		var data = $(this).serialize();
		console.log(data);
		$('#js-form-4').hide();
		$('#js-form-complete').show();
	});
	// home page settings dropdown
	$('.account-header > svg').click(function(){
		$(this).toggleClass('active');
		$('.account-settings').toggle();
	});
	// Register process for users
	$('#js-register').submit(function(e){
		e.preventDefault();
		setCookie('visitor_name', $('#js-name').val());
		setCookie('visitor_age', $('#js-age').val());
		setCookie('visitor_gender', $('#js-gender').val());
		var destination = window.location.protocol + '//' + window.location.host + '/users/sign_up';
		window.location.replace(destination);
	});
	if($('#js-surveyor').text() === ''){
		$('#js-surveyor').text(getCookie('visitor_name') == null ? 'user' : getCookie('visitor_name'));
	}
	// iCheck checkboxes https://github.com/fronteed/iCheck
	$('input').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass: 'iradio_minimal-blue',
    increaseArea: '20%' // optional
  });
  // Multisite Form navigation
  $('#js-next-1').click(function(){
  	$('#js-form-1').hide();
  	$('#js-form-2').show();
  });
  $('#js-next-2').click(function(){
  	$('#js-form-2').hide();
  	$('#js-form-3').show();
  });
  $('#js-next-3').click(function(){
  	$('#js-form-3').hide();
  	$('#js-form-4').show();
  });

  $('#js-prev-2').click(function(){
  	$('#js-form-2').hide();
  	$('#js-form-1').show();
  });
  $('#js-prev-3').click(function(){
  	$('#js-form-3').hide();
  	$('#js-form-2').show();
  });
  $('#js-prev-4').click(function(){
  	$('#js-form-4').hide();
  	$('#js-form-3').show();
  });
};
// Ready Pages
$(document).ready(ready);
// Turbolinks
$(document).on('page:load', ready);

var today = new Date();
var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days

function setCookie(name, value){
  document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

function getCookie(name){
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

var expired = new Date(today.getTime() - 24 * 3600 * 1000); // less 24 hours
function deleteCookie(name){
  document.cookie=name + "=null; path=/; expires=" + expired.toGMTString();
}