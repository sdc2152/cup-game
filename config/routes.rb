Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :scores, only: [:index, :create, :destroy]
  end
end
