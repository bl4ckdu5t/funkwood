class AccountsController < ApplicationController
	before_action :authenticate_user!
  def home
  	unless session[:survey_prompt].present?
  		redirect_to preference_path
  	end
  end
end
