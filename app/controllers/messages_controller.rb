class MessagesController < ApplicationController
	before_filter :authenticate_user!

	def create
		@conversation = Conversation.find(params[:conversation_id])
		@message = @conversation.messages.build(message_params)
		@message.user_id = current_user.id
		recipient = @conversation.sender_id == current_user.id ? @conversation.recipient_id : @conversation.sender_id
		#UserMailer.notification_email(User.find(recipient)).deliver_now
		@message.save!

		@path = conversation_path(@conversation)
	end

	private

	def message_params
		params.require(:message).permit(:body)
	end
end
