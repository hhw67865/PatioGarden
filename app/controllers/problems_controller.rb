class ProblemsController < ApplicationController

  skip_before_action :authorize, only: [:index, :show]
  
   def index
     render json: Problem.all, status: :ok
   end
   
   def show
     render json: Problem.find(params[:id]), status: :ok
   end
 
end
