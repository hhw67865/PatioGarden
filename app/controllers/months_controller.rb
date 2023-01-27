class MonthsController < ApplicationController

  skip_before_action :authorize, only: [:index, :show]
  
   def index
     render json: Month.all, status: :ok
   end
   
   def show
     render json: Month.find(params[:id]), status: :ok
   end
   
#    def create
#      render json: Month.create!(model_params), status: :created
#    end
   
#    def update
#      instance = Month.find(params[:id])
#      instance.update!(model_params)
#      render json: instance, status: :accepted
#    end
   
#    def destroy
#      Month.find(params[:id]).destroy
#      head :no_content
#     end
   
#    private
   
#    def model_params
#      params.permit(:name)
#    end
end
