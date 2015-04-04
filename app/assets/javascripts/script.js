var ready = function(){
	if(window.location.hostname === 'localhost'){
		var baseurl = window.location.protocol + '//localhost:3000/';
	}else{
		var baseurl = window.location.protocol + '//' + window.location.hostname + '/';
	}
	$(document).on('confirm', '.remodal', function () {
  	$('#new_appointment').submit();
	});
	// Picking date locations
	$(document).on('click', '#js-date-picks li', function(){
		if($(this).data('lat')){
			$('#appointment_latitude').val($(this).data('lat'));
			$('#appointment_longitude').val($(this).data('lng'));
			$('#appointment_place').val($(this).text().trim());
			$('.date-select').css({'visibility': 'visible'});
			$('#js-place-selected').text('You have selected '+$(this).text());
		}
	});
	// Uploading images
	$('.user_profile-avatar').click(function(){
		var v = $('.user-story').length;
		if(v === 1){
			$('#uploadAvatar').trigger('click');
		}
	});
	$('#uploadAvatar').change(function(){
		var s = this;
		if(this.files && this.files[0]){
			var reader = new FileReader();
			reader.onload = function(e){
				$(".user_profile-avatar::before").addRule({
					background: "url("+e.target.result+")",
					content: ""
				});
				$(".user_profile-avatar::before").addRule("background-size: 100%");
			}
			reader.readAsDataURL(this.files[0]);
		}
	});
	// Fading out notifications
	$(".notifier").filter(":visible").delay(9000).fadeOut('slow');;
	// Confirming user block
	$(document).on('click','#blockUser', function(event){
		swal({
			title: "Are you sure?",
			text: "If you do this, conversations with this user will be cleared",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, continue!",
			closeOnConfirm: false 
		},function(){
			var url = baseurl + 'chat_d';
			$.ajax({
				type: 'POST',
				data: 'id='+$('#blockUser').data('id')+'&rid='+$('#blockUser').data('rid'),
				url: url
			});
			$('.user_profile-buttons').html('<button class="button" id="js-crequest" data-id="'+$('#blockUser').data('rid')
					+'">Send chat request</button>');
			swal("Blocked!", "This user has been blocked from sending chats", "success");
		});
	});
	// Ensuring all disabled are actually disabled
	$('.disabled').click(function(e){
		e.preventDefault();
	});
	// Owl Carousel
	$("#owl-plugin").owlCarousel({
		autoPlay: true,
		stopOnHover: true,
		lazyLoad: true
	});
	// Material preloader
	var preloader = new $.materialPreloader({
    position: 'top',
    height: '5px',
    col_1: '#159756',
    col_2: '#da4733',
    col_3: '#3b78e7',
    col_4: '#fdba2c',
    fadeIn: 200,
    fadeOut: 200
  });
  $(document).on('click', 'a:not([href*=#]):not([href*=javascript])', function(){
  	preloader.on();
  });
	// Save profile changes
	$('.user_profile-buttons').on('click', '#js-save-profile', function(){
		$('.edit_preference').submit();
	});
	// Cancel profile changes
	$('.user_profile-buttons').on('click', '#js-cancel-profile',function(){
		window.location.replace(window.location.href);
	});
	// Edit profile
	$('#js-editProfile').click(function(){
		$(".user_profile-avatar::before").addRule("display: block");
		$(this).closest('.user_profile-buttons').html(
			'<button id="js-save-profile" type="submit" class="blue button">Save Changes</button>'
			+'<button id="js-cancel-profile" type="button" class="warn button">Cancel</button>');
		$('.user_profile-details.editable strong').each(function() {
			var newName = $(this).prop('id').slice(0, -5);
			$reserve = $(this);
			$(this).closest('li').html($reserve);
      $(this).after('<input type="text" name="preference['+newName+']" placeholder="'+newName.replace('_', ' ')+
      	' here" value="'+
      	$(this).data('value')+'">');
    });
    var profileName = $('#js-profile-name').text();
    $('#js-profile-name')
    .html('<input type="text" class="unameEntry" placeholder="Your name" name="preference[fullname]" value="'+
    	profileName+'">');
    var aboutUser = $('#js-userStory').text();
    $('#nameCloneInput').val($('.unameEntry').val());
    $('#js-userStory').html('<textarea class="user-story" name="preference[about]">'+aboutUser+'</textarea>');
    $('.unameEntry').focus();
    $('.js-profile-unwanted').fadeOut();
	});
	$(document).on('keyup','.unameEntry',function(){
		$('#nameCloneInput').val($(this).val());
	});
	// Infinite Scrolling
	$('#js-infinite-scroll').jscroll({
		loadingHtml: '<span>Loading...</span>',
		padding: 20,
		autoTriggerUntil: 2,
		nextSelector: '.next_page',
		contentSelector: '.window-list'
	});
	// Declining chat requests
	$('#js-drequest').click(function(){
		var url = baseurl + 'chat_d';
		$.ajax({
			type: 'POST',
			data: 'id='+$(this).data('id')+'&rid='+$(this).data('rid'),
			url: url
		}).done(function(){
			$('.user_profile-buttons').html('<button class="button" id="js-crequest" data-id="'+$(this).data('rid')
					+'">Send chat request</button>');
		}).fail(function(){
			$('.user_profile-buttons').html('<button class="button" id="js-crequest" data-id="'+$(this).data('rid')
					+'">Send chat request</button>');
		});
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
		if(window.innerWidth > 470){
			d.path("M707.627 366.293l-195.627 195.627-195.627-195.627-60.373 60.373 256 256 256-256z");
		}else{
			d.path("M128 640h768v-85.333h-768v85.333zM128 810.667h768v-85.333h-768v85.333zM128 469.333h768v-85.333h-768v85.333zM128 213.333v85.333h768v-85.333h-768z");
		}
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

/*!
 * jquery.addrule.js 0.0.2 - https://gist.github.com/yckart/5563717/
 * Add css-rules to an existing stylesheet.
 *
 * @see http://stackoverflow.com/a/16507264/1250044
 * @see https://gist.github.com/yckart/5563717
 *
 * Copyright (c) 2013 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/11/23
 **/
(function ($) {
 
    window.addRule = function (selector, styles, sheet) {
 
        styles = (function (styles) {
            if (typeof styles === "string") return styles;
            var clone = "";
            for (var prop in styles) {
                if (styles.hasOwnProperty(prop)) {
                    var val = styles[prop];
                    prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase(); // convert to dash-case
                    clone += prop + ":" + (prop === "content" ? '"' + val + '"' : val) + "; ";
                }
            }
            return clone;
        }(styles));
        sheet = sheet || document.styleSheets[document.styleSheets.length - 1];
 
        if (sheet.insertRule) sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
        else if (sheet.addRule) sheet.addRule(selector, styles);
 
        return this;
 
    };
 
    if ($) $.fn.addRule = function (styles, sheet) {
        addRule(this.selector, styles, sheet);
        return this;
    };
 
}(this.jQuery || this.Zepto));