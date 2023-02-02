class PestsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]


   def index
     render json: Pest.all, status: :ok
   end
   
   def show
     render json: Pest.find(params[:id]), status: :ok
   end
end
