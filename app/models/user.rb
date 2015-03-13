class User < ActiveRecord::Base
	has_one :preference, dependent: :destroy
	after_create :create_preference
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable
  has_many :conversations, :foreign_key => :sender_id

  def online?
	  updated_at > 10.minutes.ago
	end

	scope :online, lambda{ where("updated_at > ?", 10.minutes.ago) }
end
