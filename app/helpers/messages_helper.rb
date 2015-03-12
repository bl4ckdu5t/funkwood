module MessagesHelper
	def self_or_other(message)
    message.user == current_user ? "self" : "other"
  end
 
  def message_interlocutor(message)
    message.user == message.conversation.sender ? message.conversation.sender : message.conversation.recipient
  end

  def name_or_email(user_id)
		Preference.find_by(user_id: user_id).fullname.present? ? Preference.find_by(user_id: user_id).fullname : User.find(user_id).email
	end
end
