class UsersController < ApplicationController
   def index
     render json: User.all, status: :ok
   end
   
   def show
    user = User.find_by(id: session[:user_id])
    if user
        render json: user, status: :ok
    else
        render json: { error: "Not Authorized" }, status: :unauthorized
    end
   end

   def show_user
    render json: User.find(params[:id]), status: :ok
  end
   
   def create
     render json: User.create!(model_params), status: :created
   end
   
   def update
     instance = User.find(session[:user_id])
     instance.update!(model_params)
     render json: instance, status: :accepted
   end
   
   def destroy
     User.find(params[:id]).destroy
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

   private
   
   def model_params
     params.permit(:username, :name, :email, :description, :skill_level, :location_id)
   end
end
