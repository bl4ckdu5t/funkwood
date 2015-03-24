class PreferencesController < ApplicationController
	before_action :authenticate_user!
	before_filter :init
  def edit
  	session[:survey_prompt] = 'seen'
  end
  def update
  	updated = @preference.update_attributes(pref_params)
		if updated
			redirect_to :back, notice: 'Record updated'
		else
			render "edit"
		end
  end

  private

  def pref_params
		params.require(:preference).permit!
	end

  def init
  	@preference = Preference.where(user_id: current_user.id).first
  end
end
