class NotificationsController < ApplicationController
	before_action :authenticate_user!
	before_filter :init
	layout 'account'
  def index
  	@totalNotifications = Notification.where(receiver_id: current_user.id).order(created_at: :desc)
  	.paginate(:page => params[:page], :per_page => 5)
  	@totalNotifications.update_all(seen: true)
  end

  private

  def init
  	@preference = Preference.where(user_id: current_user.id).first
    @users = User.where.not(id: current_user.id).order(created_at: :desc)
    @notifications = Notification.where({seen: false, receiver_id: current_user.id}).count
    @allnotifications = Notification.where({seen: false, receiver_id: current_user.id}).take(4)
  end
end
