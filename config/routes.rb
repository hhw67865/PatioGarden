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
    resources :months
    resources :locations
    resources :tags
    resources :problems
    resources :pests
      resources :plants, only: :index do
      resources :posts, only: :index
    end

    get "/users/:username", to: 'users#show_user'
    get "/usernames", to: 'users#usernames'
    get "/authorized", to: "users#show"
    get "/user/contacts", to: "users#contacts"
    get "/search_users/:input", to: "users#search"
    post '/signup', to: "users#create"
    patch "/users/image", to: 'users#image'
    patch "/users", to: 'users#update'
    patch '/password/update', to: 'users#change_password'
    delete "/users", to: 'users#destroy'
    
    get "/plants/:name", to: 'plants#show_plant'
    post "/plants/filtered", to: 'plants#filtered'

    post '/login', to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    delete '/unfollow', to: 'follows#destroy'
  
    delete '/unlike', to: 'post_likes#destroy'
  
    get "/liked_posts", to: "posts#index_liked_posts"

    post "/get_conversation", to: "messages#get_conversation"

  end

end
