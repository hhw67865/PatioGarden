class UsersController < ApplicationController

  skip_before_action :authorize, only: [:show_user, :create, :usernames]

  #  def index
  #    render json: User.all, status: :ok
  #  end
   
   def show
    user = User.find_by(id: session[:user_id])
    if user
        render json: user, serializer: MainuserSerializer, status: :ok
    else
        render json: { error: "Not Authorized" }, status: :unauthorized
    end
   end

   def show_user
    render json: User.find_by!(username: params[:username]), status: :ok
  end
   
   def create
     render json: User.create!(creation_params), status: :created
   end
   
   def update
     instance = User.find(session[:user_id])
    #  if params[:image]
    #     instance.image.attach(params[:image])
    #  end
     instance.update!(model_params)
     render json: instance, serializer: MainuserSerializer, status: :accepted
   end

   def image
      instance = User.find(session[:user_id])
      instance.image.attach(params[:image])
      render json: instance
   end
   
   def destroy
     User.find(session[:user_id]).destroy
     session.delete :user_id
     head :no_content
   end
   
   def usernames

      usernames = {}

      User.all.each{|user| usernames[user.username.downcase]=true}

      render json: {usernames:usernames}, status: :ok
        
   end

   def change_password
    user = User.find_by(id: session[:user_id])
    if user&.authenticate(params[:old_password])
        user.update!(password: params[:new_password])
        render json: user, status: :ok
    else
        render json: { errors: ["Old Password is Incorrect"] }, status: :unauthorized
    end

   end

   def contacts
    render json: User.find(session[:user_id]).contacts, status: :ok
   end

   def search
    render json: User.all.where("username ILIKE ?", "#{params[:input]}%"), status: :ok
   end

   private
   
   def model_params
     params.permit(:username, :name, :email,:description, :skill_level, :location_id)
   end
   
   def creation_params
    params.permit(:username, :email, :password)
   end
end
