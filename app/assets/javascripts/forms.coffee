ready = ->
	$('[id^="edit_department"]').on("ajax:success", (e, data, status, xhr) ->
		$(this).append "<p class='fr'>Updated Succesfully</p>"
		$(this).children('.fr').delay(2000).fadeOut()
	).on "ajax:error", (e, data, status, error) ->
		$(this).append "<p class='fr'>Failed to update</p>"
		return

$(document).ready(ready)
$(document).on('page:load', ready)