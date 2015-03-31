class Appointment < ActiveRecord::Base
	scope :involving, -> (user) do
    where("appointments.sender_id =? OR appointments.recipient_id =?",user.id,user.id)
  end
 
  scope :between, -> (sender_id,recipient_id) do
    where("(appointments.sender_id = ? AND appointments.recipient_id =?) OR (appointments.sender_id = ? AND appointments.recipient_id =?)", sender_id,recipient_id, recipient_id, sender_id)
  end
end
