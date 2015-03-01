class PreferencesController < ApplicationController
	before_action :authenticate_user!
  def index
  	session[:survey_prompt] = 'seen'
  	@preference = Preference.where(user_id: current_user.id).first
  end
  def create
  	@preference = Preference.where(user_id: current_user.id).first
  end
end
