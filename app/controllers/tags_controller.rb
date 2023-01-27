class TagsController < ApplicationController

  skip_before_action :authorize, only: [:index, :show]

   def index
     render json: Tag.all, status: :ok
   end
   
   def show
     render json: Tag.find(params[:id]), status: :ok
   end
   
#    def create
#      render json: Tag.create!(model_params), status: :created
#    end
   
#    def update
#      instance = Tag.find(params[:id])
#      instance.update!(model_params)
#      render json: instance, status: :accepted
#    end
   
#    def destroy
#      Tag.find(params[:id]).destroy
#      head :no_content
#    end
   
#    private
   
#    def model_params
#      params.permit(:name)
#    end
end
