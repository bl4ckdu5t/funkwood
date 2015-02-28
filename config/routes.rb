Rails.application.routes.draw do
	#get ':profile' => 'profile#index', :as => :profile
  get 'home' => 'accounts#home', :as => :home
  devise_for :users
  root 'welcome#index'
end
