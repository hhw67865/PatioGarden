class FollowsController < ApplicationController

   def create
     render json: Follow.create!(follower_id: session[:user_id], followed_id: params[:followed_id]), status: :created
   end
   
   def destroy
     Follow.find_by!(follower_id: session[:user_id], followed_id: params[:followed_id]).destroy
     head :no_content
   end
   
   private
   
end
