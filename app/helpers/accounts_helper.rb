module AccountsHelper
	def conversation_interlocutor(conversation)
    conversation.recipient == current_user ? conversation.sender : conversation.recipient
  end
  def name_or_email(user_id)
		Preference.find_by(user_id: user_id).fullname.present? ? Preference.find_by(user_id: user_id).fullname : User.find(user_id).email
	end
end
