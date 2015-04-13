class AccountsController < ApplicationController
	before_action :authenticate_user!, except: [:profile, :conversations, :appointments]
	before_filter :init
	layout 'account'
  def home
  	profile = [@preference.fullname, @preference.username, @preference.avatar, @preference.gender, @preference.age, 
     @preference.career, @preference.relationship_type, @preference.religion, @preference.complexion, @preference.height,
     @preference.weight, @preference.body_type, @preference.location, @preference.about, @preference.partner_complexion,
  	 @preference.partner_body_type, @preference.partner_working_class, @preference.partner_religion
  	]
  	completed = 0;
  	for i in profile
  		unless i.blank?
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
  end

  def profile
  	profile = params[:profile]
  	if profile.to_i == 0
      @user = Preference.find_by_username(profile) or render 'public/404.html',:layout => false, status: 404
  	else
      @user = Preference.find_by_user_id(profile) or render 'public/404.html',:layout => false, status: 404
  	end
    @appointment = Appointment.new
    @photo = Photo.new
  end

  def search
    @results = Preference.where('fullname ilike ?',"%#{params[:q]}%").where.not(user_id: current_user.id)
  end

  def conversations
    profile = params[:profile]
    if profile.to_i == 0
      @user = Preference.find_by_username(profile) or render 'public/404.html',:layout => false, status: 404
    else
      @user = Preference.find_by_user_id(profile) or render 'public/404.html',:layout => false, status: 404
    end
  end

  def appointments
    profile = params[:profile]
    if profile.to_i == 0
      @user = Preference.find_by_username(profile) or render 'public/404.html',:layout => false, status: 404
    else
      @user = Preference.find_by_user_id(profile) or render 'public/404.html',:layout => false, status: 404
    end
  end

  def test
    # method to test functionality of file uploads without ajax
    @user = Preference.find_by_user_id(current_user.id)
  end

  private

  def init
  	@preference = user_signed_in? ? Preference.where(user_id: current_user.id).first : 0
    @users = user_signed_in? ? User.where.not(id: current_user.id).order(created_at: :desc) : User.all
    @client = GooglePlaces::Client.new('AIzaSyDMnERpbaiRapKJwxGIlrQlPTr8MWIfV14')
    # Supported places types from https://developers.google.com/places/supported_types?csw=1
    @placeTypes = ['restaurant', 'food', 'spa', 'hotel', 'amusement_park', 'movie_theater', 'meal_takeaway', 'night_club']
    if user_signed_in?
      @notifications = Notification.where({seen: false, receiver_id: current_user.id}).count
      @allnotifications = Notification.where({seen: false, receiver_id: current_user.id}).take(4)
      if Rails.env == "production"
        @geo =  Geocoder.search("#{current_user.current_sign_in_ip}")
      else
        #MKE IP
        @geo = Geocoder.search("129.89.197.43")
        #NIG IP
        #@geo = Geocoder.search("197.242.107.185")
      end
      @coordinates = @geo.map { |l| [l.latitude, l.longitude] }.flatten
    end
  end
end
