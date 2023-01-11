class PlantsController < ApplicationController
   def index
     render json: Plant.all, status: :ok
   end
   
   def show
     render json: Plant.find(params[:id]), status: :ok
   end
   
#    def create
#      render json: Plant.create!(model_params), status: :created
#    end
   
#    def update
#      instance = Plant.find(params[:id])
#      instance.update!(model_params)
#      render json: instance, status: :accepted
#    end
   
#    def destroy
#      Plant.find(params[:id]).destroy
#      head :no_content
#    end
   
#    private
   
#    def model_params
#      params.permit(:name, :description, :care)
#    end
end
