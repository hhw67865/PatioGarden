class FollowsController < ApplicationController
#    def index
#      render json: Follow.all, status: :ok
#    end
   
#    def show
#      render json: Follow.find(params[:id]), status: :ok
#    end
   
   def create
     render json: Follow.create!(model_params), status: :created
   end
   
#    def update
#      instance = Follow.find(params[:id])
#      instance.update!(model_params)
#      render json: instance, status: :accepted
#    end
   
   def destroy
     Follow.find_by!(follower_id: params[:follower_id], followed_id: params[:followed_id]).destroy
     head :no_content
   end
   
   private
   
   def model_params
     params.permit(:follower_id, :followed_id)
   end
end
