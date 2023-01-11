class PostTagsController < ApplicationController
#    def index
#      render json: PostTag.all, status: :ok
#    end
   
#    def show
#      render json: PostTag.find(params[:id]), status: :ok
#    end
   
   def create
     render json: PostTag.create!(model_params), status: :created
   end
   
#    def update
#      instance = PostTag.find(params[:id])
#      instance.update!(model_params)
#      render json: instance, status: :accepted
#    end
   
   def destroy
     PostTag.find(params[:id]).destroy
     head :no_content
   end
   
   private
   
   def model_params
     params.permit(:post_id, :tag_id)
   end
end
