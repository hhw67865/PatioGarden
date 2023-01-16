class PostsController < ApplicationController
   def index
    if params[:user_id]
      render json: User.find_by!(username: params[:user_id]).posts.order(created_at: :desc), status: :ok
    elsif params[:plant_id]
      render json: Plant.where("name ilike ?", params[:plant_id])[0].posts.order(created_at: :desc), status: :ok
    else
     render json: Post.all, status: :ok
    end
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
