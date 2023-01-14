Rails.application.routes.draw do
  scope 'api' do
    resources :follows
    resources :post_tags
    resources :comments
    resources :posts do
      resources :comments, only: :index
    end
    resources :users, except: [:show,:update,:destroy] do
      resources :posts, only: :index
    end
    resources :plant_location_months
    resources :plant_problems
    resources :plant_pests
    resources :months
    resources :locations
    resources :tags
    resources :problems
    resources :pests
    resources :plants

    get "/users/:username", to: 'users#show_user'

    patch "/users", to: 'users#update'

    delete "users", to: 'users#destroy'

    post '/login', to: "sessions#create"

    get "/authorized", to: "users#show"
  
    delete "/logout", to: "sessions#destroy"
  
    post '/signup', to: "users#create"

    get "/usernames", to: 'users#usernames'

    patch '/password/update', to: 'users#change_password'

  end
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

end
