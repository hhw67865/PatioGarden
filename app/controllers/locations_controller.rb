class LocationsController < ApplicationController
   def index
     render json: Location.all, status: :ok
   end
   
   def show
     render json: Location.find(params[:id]), status: :ok
   end
   
#    def create
#      render json: Location.create!(model_params), status: :created
#    end
   
#    def update
#      instance = Location.find(params[:id])
#      instance.update!(model_params)
#      render json: instance, status: :accepted
#    end
   
#    def destroy
#      Location.find(params[:id]).destroy
#      head :no_content
#    end
   
#    private
   
#    def model_params
#      params.permit(:name)
#    end
end
