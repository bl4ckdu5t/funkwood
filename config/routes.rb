Rails.application.routes.draw do
  get 'home' => 'accounts#home', :as => :home
  devise_for :users
  root 'welcome#index'
end
