class AccountsController < ApplicationController
	before_action :authenticate_user!
  def home
  	@preference = Preference.where(user_id: current_user.id).first
  	unless session[:survey_prompt].present?
  		redirect_to preference_path
  	end
  end
end
