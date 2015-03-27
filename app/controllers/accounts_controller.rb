class AccountsController < ApplicationController
	before_action :authenticate_user!, except: [:profile]
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
    @conversations = Conversation.involving(current_user).order(created_at: :desc)
    @client = GooglePlaces::Client.new('AIzaSyDMnERpbaiRapKJwxGIlrQlPTr8MWIfV14')
    #render text: @client.spots(-33.8670522, 151.1957362, types: ['restaurant']) and return
  end

  def profile
  	profile = params[:profile]
  	if profile.to_i == 0
      @user = Preference.find_by_username(profile) or render_404
  	else
      @user = Preference.find_by_user_id(profile) or render_404
  	end
  end

  private

  def init
  	@preference = user_signed_in? ? Preference.where(user_id: current_user.id).first : 0
    @users = user_signed_in? ? User.where.not(id: current_user.id).order(created_at: :desc) : User.all
    if user_signed_in?
      @notifications = Notification.where({seen: false, receiver_id: current_user.id}).count
      @allnotifications = Notification.where({seen: false, receiver_id: current_user.id}).take(4)
    end
  end
end
