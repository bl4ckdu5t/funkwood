class Preference < ActiveRecord::Base
	belongs_to :user
	validates_uniqueness_of :username, :allow_blank => true
	has_attached_file :avatar, :styles => { :medium => "200x200>", :thumb => "100x100>" },
	 :default_url => "/images/:style/missing.jpg"
	validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
end
