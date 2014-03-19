GiftMe::Application.routes.draw do
  resource :session, only: [:create, :destroy]

  match 'auth/:provider/callback', to: 'sessions#create'
  match 'auth/failure', to: redirect('/')
  match 'signout', to: 'sessions#destroy', as: 'signout'

  resources :users do
    resources :items, only: [:index]
  end

  resources :items, only: [:index, :show]
  resources :wanted_user_items, only: [:create, :destroy]

  resources :friends, only: [:index]
  resources :user_item_recommendations, only: [:create, :destroy]

  get '/', to: 'static_pages#home', as: 'root'
end
