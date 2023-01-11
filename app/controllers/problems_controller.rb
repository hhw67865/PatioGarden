class ProblemsController < ApplicationController
   def index
     render json: Problem.all, status: :ok
   end
   
   def show
     render json: Problem.find(params[:id]), status: :ok
   end
   
#    def create
#      render json: Problem.create!(model_params), status: :created
#    end
   
#    def update
#      instance = Problem.find(params[:id])
#      instance.update!(model_params)
#      render json: instance, status: :accepted
#    end
   
#    def destroy
#      Problem.find(params[:id]).destroy
#      head :no_content
#    end
   
#    private
   
#    def model_params
#      params.permit(:name, :description, :preventatives)
#    end
end
