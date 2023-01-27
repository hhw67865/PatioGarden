class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response
    before_action :authorize

    private
    def render_not_found_response (error)
      render json: {error: "#{error.model} not found."}, status: :not_found
    end

    def render_invalid_response (invalid)
      render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def authorize
        render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
    end


    
end
