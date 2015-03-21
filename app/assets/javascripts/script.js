var ready = function(){
	if(document.location.hostname === 'localhost'){
		var baseurl = document.location.protocol + '//localhost:3000/';
	}else{
		var baseurl = document.location.protocol + '//' + document.location.hostname + '/';
	}
	// Infinite Scrolling
	$('#js-infinite-scroll').jscroll({
		loadingHtml: '<span>Loading...</span>',
		padding: 20,
		autoTriggerUntil: 2,
		nextSelector: '.next_page',
		contentSelector: '.window-list'
	});
	// Accepting chat requests
	$('#js-arequest').click(function(){
		var url = baseurl + 'chat_a';
		$.ajax({
			type: 'POST',
			data: 'id='+$(this).data('id')+'&rid='+$(this).data('rid'),
			url: url
		}).done(function(response){
			if (response.status === 'success') {
				$('.user_profile-buttons').html($('#js-acceptedReturn').html());
			};
		}).fail(function(){
			console.log('failed');
		});
	});
	// Sending chat requests
	$('#js-crequest').click(function(){
		var url = baseurl + 'chat_r';
		$.ajax({
			type: 'POST',
			data: 'id='+$(this).data('id'),
			url: url
		}).done(function(response){
			if (response.status === 'success') {
				$('.user_profile-buttons').html('<button class="disabled button">Request sent</button>')
			};
		}).fail(function(){
			console.log('failed');
		});
	});
	var d = Snap('#js-dropper');
	if(d){
		d.path("M707.627 366.293l-195.627 195.627-195.627-195.627-60.373 60.373 256 256 256-256z");
	}
	// home page settings dropdown
	$('.account-header > svg').click(function(){
		$('.account-settings').toggle();
		$('.account ul').removeClass('on-top');
		$('.account-settings').toggleClass('on-top');
	});
	// Reading notifications
	$('#js-notifier').click(function(){
		$('.account-notifier').toggle();
		$('.account ul').removeClass('on-top');
		$('.account-notifier').toggleClass('on-top');
		$.get(baseurl + 'notifications');
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
	if($('#js-visitor-name').text() === ''){
		$('#js-visitor-name').text(getCookie('visitor_name') == null ? 'user' : getCookie('visitor_name'));
	}
	if($('.js-visitor-name').val() === ''){
		if(getCookie('visitor_name') != null){
			$('.js-visitor-name').val(getCookie('visitor_name'));
		}
	}
	if($('.js-visitor-age').val() === ''){
		if(getCookie('visitor_age') != null){
			$('.js-visitor-age').val(getCookie('visitor_age'));
		}
	}
	if($('.js-visitor-gender').val() === ''){
		if(getCookie('visitor_gender') != null){
			$('.js-visitor-gender').val(getCookie('visitor_gender'));
		}
	}
	// iCheck checkboxes https://github.com/fronteed/iCheck
	if($().iCheck){
		$('input').iCheck({
	    checkboxClass: 'icheckbox_minimal-blue',
	    radioClass: 'iradio_minimal-blue',
	    increaseArea: '20%' // optional
	  });
	}
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