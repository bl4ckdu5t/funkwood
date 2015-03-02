class AccountsController < ApplicationController
	before_action :authenticate_user!
	before_filter :init
	layout 'account'
  def home
  	profile = [@preference.fullname, @preference.username, @preference.avatar, @preference.gender, @preference.age_range,
  	 @preference.working_class, @preference.career, @preference.relationship_type, @preference.religion, @preference.complexion,
  	 @preference.height, @preference.weight, @preference.body_type, @preference.location, @preference.about, @preference.partner_complexion,
  	 @preference.partner_body_type, @preference.partner_working_class, @preference.partner_career, @preference.partner_religion
  	]
  	completed = 0;
  	for i in profile
  		unless i.eql? nil
  			completed += 1
  		end
  	end
  	profile_count = profile.length
  	@percentage = 100 * completed / profile_count
  	if @percentage < 45
	  	unless session[:survey_prompt].present?
	  		redirect_to preference_path
	  	end
	  end
  end

  def profile

  end

  private

  def init
  	@preference = Preference.where(user_id: current_user.id).first
  end
end
