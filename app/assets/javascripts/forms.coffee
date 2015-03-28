ready = ->
	$('.edit_preference').on("ajax:success", (e, data, status, xhr) ->
		$('#js-form-4').hide()
		$('#js-form-complete').show()
	).on "ajax:error", (e, data, status, error) ->
		$('#js-form-4').hide()
		return

	$('.user_profile-review form').on("ajax:success", (e, data, status, xhr) ->
		if $('.notifier').length == 0
			$('body').prepend('<div class="notifier">Profile updated successfully</div>')
		else
			$('.notifier').text('Profile updated successfully')
		
		window.location.replace('/user/'+$('meta[name=user-id]').prop('content'))
	).on "ajax:error", (e, data, status, error) ->
		console.log(error)
		return

$(document).ready(ready)