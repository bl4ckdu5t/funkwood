Rails.application.routes.draw do
  get 'home' => 'account#home', :as => :home
  devise_for :users
  root 'welcome#index'
end
