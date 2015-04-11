class PhotosController < ApplicationController
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
