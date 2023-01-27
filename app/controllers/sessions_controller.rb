class SessionsController < ApplicationController

    skip_before_action :authorize, only: [:create]

    def create
        user = User.where("username ilike ?", params[:username])
        
        if user.length > 0
            if user[0].authenticate(params[:password])
                session[:user_id] = user[0].id
                render json: user[0], serializer: MainuserSerializer, status: :created
            else
                render json: {error: "Invalid username or password"}, status: :unauthorized
            end
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end
