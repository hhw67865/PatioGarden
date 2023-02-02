class PostTagsController < ApplicationController
   
   def create
     render json: PostTag.create!(model_params), status: :created
   end
   
   private
   
   def model_params
     params.permit(:post_id, :tag_id)
   end
end
