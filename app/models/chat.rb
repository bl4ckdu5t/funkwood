class Chat < ActiveRecord::Base
	scope :between, -> (sender_id,recipient_id) do
    where("(chats.sender_id = ? AND chats.recipient_id =?) OR (chats.sender_id = ? AND chats.recipient_id =?)", sender_id,recipient_id, recipient_id, sender_id)
  end
end
