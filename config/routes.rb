GiftMe::Application.routes.draw do
  resource :session, only: [:create, :destroy]

  match 'auth/:provider/callback', to: 'sessions#create'
  match 'auth/failure', to: redirect('/')
  match 'signout', to: 'sessions#destroy', as: 'signout'

  resources :users do
    resources :items, only: [:index]
  end


  resources :items
  resources :wanted_user_items

  resources :friends, only: [:index]

  get '/', to: 'static_pages#home', as: 'root'
end
