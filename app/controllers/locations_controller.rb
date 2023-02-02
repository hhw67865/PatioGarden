class LocationsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]

   def index
     render json: Location.all, status: :ok
   end
   
   def show
     render json: Location.find(params[:id]), status: :ok
   end

end
