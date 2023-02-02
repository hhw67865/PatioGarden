class MonthsController < ApplicationController

  skip_before_action :authorize, only: [:index, :show]
  
   def index
     render json: Month.all, status: :ok
   end
   
   def show
     render json: Month.find(params[:id]), status: :ok
   end
   
end
