class Photo < ActiveRecord::Base
	belongs_to :user
	has_attached_file :photo, :bucket => 'musterd8', :styles => { :medium => "200x200>", :thumb => "100x100>" },
	 :storage => :s3, :url => ":s3_domain_url",
	 :s3_host_name => 's3.amazonaws.com',  :s3_credentials => "#{Rails.root}/config/aws.yml",
	 :path => "/images/gallery/:id/:style/:basename.:extension"
	validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/
end
