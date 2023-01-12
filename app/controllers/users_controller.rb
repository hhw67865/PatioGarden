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
     instance = User.find(params[:id])
     instance.update!(model_params)
     render json: instance, status: :accepted
   end
   
   def destroy
     User.find(params[:id]).destroy
     head :no_content
   end
   
   def available
    
    if User.find_by(username: params[:username])
      render json: {availability: true}, status: :ok
    else
      render json: {availability: false}, status: :ok
    end
    
   end

   private
   
   def model_params
     params.permit(:username, :name, :password, :email, :description, :skill_level, :location_id)
   end
end
