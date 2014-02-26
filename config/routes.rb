GiftMe::Application.routes.draw do

  match 'auth/:provider/callback', to: 'sessions#create'
  match 'auth/failure', to: redirect('/')
  match 'signout', to: 'sessions#destroy', as: 'signout'

  resources :users do
    resources :items, only: [:index]
  end

  resources :items
  resources :wanted_user_items

  get '/', to: 'static_pages#home', as: 'root'
end
