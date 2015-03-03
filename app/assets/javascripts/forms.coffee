ready = ->
	$('.edit_preference').on("ajax:success", (e, data, status, xhr) ->
		$('#js-form-4').hide()
		$('#js-form-complete').show()
	).on "ajax:error", (e, data, status, error) ->
		$('#js-form-4').hide()
		return

$(document).ready(ready)
$(document).on('page:load', ready)