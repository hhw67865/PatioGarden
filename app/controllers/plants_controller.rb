class PlantsController < ApplicationController

  skip_before_action :authorize, only: [:index, :show, :show_plant, :filtered]

   def index
     render json: Plant.all, status: :ok
   end
   
   def show     
     render json: Plant.find(params[:id]), status: :ok
   end

   def show_plant
    plant = Plant.where("name ilike ?", params[:name])
    if plant.length > 0
      render json: plant[0], status: :ok
    else
      render json: {error: "Plant name does not exist"}, status: :not_found
    end
   end

   def filtered
      render json: PlantLocationMonth.all.where(["location_id = ? and month_id = ?",params[:location_id], params[:month_id]]).map{|p| p.plant}, status: :ok
   end
end
