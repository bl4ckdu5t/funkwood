ready = ->
	$('.edit_preference').on("ajax:success", (e, data, status, xhr) ->
		$('#js-form-4').hide()
		$('#js-form-complete').show()
	).on "ajax:error", (e, data, status, error) ->
		$('#js-form-4').hide()
		return

	$('.user_profile-review form').on("ajax:success", (e, data, status, xhr) ->
		alert('Profile updated')
		window.location.reload()
	).on "ajax:error", (e, data, status, error) ->
		alert('Profile failed to update')
		return

$(document).ready(ready)