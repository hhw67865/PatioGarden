class FollowsController < ApplicationController
#    def index
#      render json: Follow.all, status: :ok
#    end
   
#    def show
#      render json: Follow.find(params[:id]), status: :ok
#    end
   
   def create
     render json: Follow.create!(follower_id: session[:user_id], followed_id: params[:followed_id]), status: :created
   end
   
#    def update
#      instance = Follow.find(params[:id])
#      instance.update!(model_params)
#      render json: instance, status: :accepted
#    end
   
   def destroy
     Follow.find_by!(follower_id: session[:user_id], followed_id: params[:followed_id]).destroy
     head :no_content
   end
   
   private
   
end
