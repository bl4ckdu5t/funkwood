class AccountsController < ApplicationController
	before_action :authenticate_user!
  def home
  	#render text: Preference.where(user_id: current_user.id).all and return
  end
end
