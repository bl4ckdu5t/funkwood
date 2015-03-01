class PreferencesController < ApplicationController
	before_action :authenticate_user!
  def index
  	session[:survey_prompt] = 'seen'
  end
end
