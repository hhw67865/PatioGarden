class CommentsController < ApplicationController
    
# def index
#   render json: Comment.all, status: :ok
# end

# def show
#   render json: Comment.find(params[:id]), status: :ok
# end

def create
  render json: Comment.create!(model_params), status: :created
end

def update
  instance = Comment.find(params[:id])
  instance.update!(model_params)
  render json: instance, status: :accepted
end

def destroy
  Comment.find(params[:id]).destroy
  head :no_content
end

private

def model_params
  params.permit(:comment_body, :post_id, :user_id)
end
end
