Rails.application.routes.draw do
	get ':profile/conversations' => 'accounts#conversations', :as => :follower
	resources :appointments
	get 'search' => 'accounts#search'
	if Rails.env == "development"
		get 'test' => 'accounts#test'
	end
  get 'notifications' => 'notifications#index', :as => :notifications

	post 'chat_d' => 'chats#decline'
	post 'chat_a' => 'chats#accept'
	post 'chat_r' => 'chats#call'
	resources :chats
	resources :conversations do
		resources :messages
	end
	patch 'preferences' => 'preferences#update'
  get 'preferences' => 'preferences#edit', :as => :preference
	get 'user/:profile' => 'accounts#profile', :as => :profile
  get 'home' => 'accounts#home', :as => :home
  devise_for :users
  root 'welcome#index'
end
