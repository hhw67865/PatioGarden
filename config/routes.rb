Rails.application.routes.draw do
  
  
  
  scope 'api' do
    mount ActionCable.server => "/cable"

    resources :messages
    resources :follows, only: :create
    resources :post_tags
    resources :comments
    resources :post_likes
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
      resources :plants, only: :index do
      resources :posts, only: :index
    end

    patch "/users/image", to: 'users#image'

    get "/users/:username", to: 'users#show_user'

    get "/plants/:name", to: 'plants#show_plant'

    post "/plants/filtered", to: 'plants#filtered'

    patch "/users", to: 'users#update'

    delete "/users", to: 'users#destroy'

    post '/login', to: "sessions#create"

    get "/authorized", to: "users#show"
  
    delete "/logout", to: "sessions#destroy"
  
    post '/signup', to: "users#create"

    get "/usernames", to: 'users#usernames'

    patch '/password/update', to: 'users#change_password'

    delete '/unfollow', to: 'follows#destroy'

    delete '/unlike', to: 'post_likes#destroy'

    get "/liked_posts", to: "posts#index_liked_posts"

    post "/get_conversation", to: "messages#get_conversation"

  end
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

end
