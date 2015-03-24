var ready = function(){
	if(window.location.hostname === 'localhost'){
		var baseurl = window.location.protocol + '//localhost:3000/';
	}else{
		var baseurl = window.location.protocol + '//' + window.location.hostname + '/';
	}
	// Save profile changes
	$('.user_profile-buttons').on('click', '#js-save-profile', function(){
		var url = baseurl + 'preferences';
		var data = 'preference["fullname"]=' + $('[name=fullname]').val() + '&preference["about"]=' + $('[name=about]').val() 
		+ '&preference["username"]=' + $('[name=username]').val()+'&preference["height"]='+$('[name=height]').val()+
		'&preference["weight"]='+$('[name=weight]').val()+'&preference["body_type"]='+$('[name=body_type]').val()
		+'&preference["complexion"]='+$('[name=complexion]').val()+'&preference["religion"]='+$('[name=religion]').val()
		+'&preference["gender"]='+$('[name=gender]').val()+'&preference["age"]='+$('[name=age]').val()
		+'&preference["location"]='+$('[name=location]').val()+'&preference["working_class"]='+$('[name=working_class]').val()
		+'&_method=patch&controller=preferences&action=update';
		$.ajax({
			type: 'POST',
			data: data,
			url: url
		}).done(function(response){
			alert('Successful!');
		}).fail(function(){
			alert('Failed');
		});
	});
	// Cancel profile changes
	$('.user_profile-buttons').on('click', '#js-cancel-profile',function(){
		window.location.reload();
	});
	// Edit profile
	$('#js-editProfile').click(function(){
		$(this).closest('.user_profile-buttons').html('<button id="js-save-profile" class="blue button">Save Changes</button>'
			+'<button id="js-cancel-profile" class="button">Cancel</button>'+' <em>Edit profile fields below</em>');
		$('.user_profile-details strong').each(function() {
			var newName = $(this).prop('id').slice(0, -5);
      $(this).after('<input type="text" name="'+newName+'" placeholder="'+newName.replace('_', ' ')+' here" value="'+
      	$(this).data('value')+'">');
    });
    var profileName = $('#js-profile-name').text();
    $('#js-profile-name').html('<input type="text" class="unameEntry" name="fullname" value="'+profileName+'">');
    var aboutUser = $('#js-userStory').text();
    $('#js-userStory').html('<textarea class="user-story" name="about">'+aboutUser+'</textarea>');
    $('.sideEntry').each(function(){
    	var sideEntry = $(this).data('entry');
    	var entryVal = $(this).text().slice(0, 7) == 'Unknown' ? '' : $(this).text();
    	$(this).html('<input type="text" name="'+sideEntry+'" value="'+ entryVal +
    		'" placeholder="'+sideEntry.replace('_',' ')+'"">');
    });
    $('.unameEntry').focus();
    $('.js-profile-unwanted').fadeOut();
	});
	// Changing chat buttons to block chat
	$('#js-chatActive').hover(function(){
		$(this).removeClass('blue');
		$(this).addClass('warn');
		$(this).html($('#js-template-block').html());
	},function(){
		$(this).removeClass('warn');
		$(this).addClass('blue');
		$(this).html($('#js-template-chat').html());
	});
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
		$.get(baseurl + 'notifications',function(){
			$('#js-notifbox').fadeOut();
		});
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