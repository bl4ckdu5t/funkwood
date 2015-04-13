class UserMailer < ActionMailer::Base
	layout 'email'
  default from: "noreply@musterd8.com"

  def notification_email(user)
  	@user = user
  	@url = 'http://musterd8.com/home'
  	@notification = 'new chat request'
  	mail(to: @user.email, subject: 'New notification from musterd8')
  end
end
