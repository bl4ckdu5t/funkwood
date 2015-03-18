class ChatsController < ApplicationController
	def index		
	end

	def request
		chat = Chat.new
		chat.sender_id = current_user.id
		chat.recipient_id = params[:id]
		if chat.save
			render json: { status: 'success' }
			Notification.new({sender_id: current_user.id, receiver_id: params[:id], message: 'new chat request'}).save
		else
			render json: { status: 'fail' }
		end
	end

	def decline
	end
end
