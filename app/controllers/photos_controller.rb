class PhotosController < ApplicationController
	before_action :authenticate_user!
	def index
		photos = Photo.where(user_id: current_user.id)
		render json: { photos: photos.map{ |photo| [photo.photo_file_name] } }
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
