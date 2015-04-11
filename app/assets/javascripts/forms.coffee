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

	$('#new_appointment').on("ajax:success", (e, data, status, xhr) ->
		if $('.notifier').length == 0
			$('body').prepend('<div class="notifier">Date appointment created</div>')
		else
			$('.notifier').text('Date appointment created')
	).on "ajax:error", (e, data, status, error) ->
		console.log(error)
		return

	$('#new_photo').on("ajax:success", (e, data, status, xhr) ->
		console.log data
		$.get '/photos', (data) ->
		  $('.gallery-preview').html('')
		  arrayLength = data.photos.length
		  i = 0
		  while i < arrayLength
		  	$('.gallery-preview').prepend(data.photos[i])
		  	i++
	).on "ajax:error", (e, data, status, error) ->
		console.log error
		$.get '/photos', (data) ->
		  $('.gallery-preview').html('')
		  arrayLength = data.photos.length
		  i = 0
		  while i < arrayLength
		  	$('.gallery-preview').prepend(data.photos[i])
		  	i++
		return

$(document).ready(ready)