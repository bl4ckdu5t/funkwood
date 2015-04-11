class PhotosController < ApplicationController
	before_action :authenticate_user!
	layout false
	def index
		if request.xhr?
			@photos = Photo.where(user_id: current_user.id)
		else
			render 'public/404.html',:layout => false, status: 404
		end
	end
	def create
		photo = Photo.new(photo_params)
		if photo.save
			render json: {status: 'success'}
		else
			render json: {status: 'fail'}
		end
	end

	private

	def photo_params
		params.require(:photo).permit!
	end
end
