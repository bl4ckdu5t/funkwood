class ChatsController < ApplicationController
	def index		
	end

	def call
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

	def accept
		chat = Chat.find(params[:id])
		chat.accepted = true
		if chat.save
			render json: { status: 'success' }
			Notification.new({sender_id: current_user.id, receiver_id: params[:rid], message: 'chat request accepted'}).save
		else
			render json: { status: 'fail' }
		end
	end

	def decline
	end
end
