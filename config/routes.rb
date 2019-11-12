Rails.application.routes.draw do
  devise_for :users
  root to: "groups#index"
  resources :users, only: [:indx, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
