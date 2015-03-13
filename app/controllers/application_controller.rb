class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  after_filter :user_activity

  def after_sign_in_path_for(resource)
    home_path
  end
  def render_404
	  raise ActionController::RoutingError.new('Not Found')
	end

	private

	def user_activity
		current_user.try :touch
	end
end
