Rails.application.routes.draw do
  scope 'api' do
    resources :follows
    resources :post_tags
    resources :comments
    resources :posts
    resources :users
    resources :plant_location_months
    resources :plant_problems
    resources :plant_pests
    resources :months
    resources :locations
    resources :tags
    resources :problems
    resources :pests
    resources :plants

    get "/users/:id", to: 'users#show_user'

    post '/login', to: "sessions#create"

    get "/authorized", to: "users#show"
  
    delete "/logout", to: "sessions#destroy"
  
    post '/signup', to: "users#create"

    get "/user/:username", to: 'users#available'

  end
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

end
