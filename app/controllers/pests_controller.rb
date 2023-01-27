class PestsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]


   def index
     render json: Pest.all, status: :ok
   end
   
   def show
     render json: Pest.find(params[:id]), status: :ok
   end
   
#    def create
#      render json: Pest.create!(model_params), status: :created
#    end
   
#    def update
#      instance = Pest.find(params[:id])
#      instance.update!(model_params)
#      render json: instance, status: :accepted
#    end
   
#    def destroy
#      Pest.find(params[:id]).destroy
#      head :no_content
#    end
   
#    private
   
#    def model_params
#      params.permit(:name, :description, :preventatives)
#    end
end
