class PostsController < ApplicationController
   def index
    if params[:user_id]
      render json: User.find_by!(username: params[:user_id]).posts.order(created_at: :desc), status: :ok
    elsif params[:plant_id]
      render json: Plant.where("name ilike ?", params[:plant_id])[0].posts.order(created_at: :desc), status: :ok
    else
     render json: Post.all.order(created_at: :desc), status: :ok
    end
   end
   
   
   def show
     render json: Post.find(params[:id]), status: :ok
   end
   
   def create
    post = Post.create!(model_params)
    if params[:pictures]
      params[:pictures].each do |picture|
        post.pictures.attach(picture)
      end
    end
    render json: post, status: :created
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

   def index_liked_posts
     render json: User.find(session[:user_id]).liked_posts, status: :ok
   end

   
   private
   
   def model_params
     params.permit(:title, :post_body, :user_id, :plant_id)
   end
end
