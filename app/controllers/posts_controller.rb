class PostsController < ApplicationController
   def index
     render json: Post.all, status: :ok
   end
   
   def show
     render json: Post.find(params[:id]), status: :ok
   end
   
   def create
     render json: Post.create!(model_params), status: :created
   end
   
   def update
     instance = Post.find(params[:id])
     instance.update!(model_params)
     render json: instance, status: :accepted
   end
   
   def destroy
     Post.find(params[:id]).destroy
     head :no_content
   end
   
   private
   
   def model_params
     params.permit(:title, :post_body, :user_id, :plant_id)
   end
end
