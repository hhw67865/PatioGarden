class TagsController < ApplicationController

  skip_before_action :authorize, only: [:index, :show]

   def index
     render json: Tag.all, status: :ok
   end
   
   def show
     render json: Tag.find(params[:id]), status: :ok
   end
 
end
