class Preference < ActiveRecord::Base
	belongs_to :user
	validates_uniqueness_of :username, :allow_blank => true
	has_attached_file :avatar, :bucket => 'musterd8', :styles => { :medium => "200x200>", :thumb => "100x100>" },
	 :default_url => "/images/:style/missing.jpg", :storage => :s3, :url => ":s3_domain_url",
	 :s3_host_name => 's3.amazonaws.com',  :s3_credentials => "#{Rails.root}/config/aws.yml",
	 :path => "/images/:id/:style.:extension"
	validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
end
