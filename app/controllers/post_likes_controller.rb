class PostLikesController < ApplicationController



def create
    render json: PostLike.create!(user_id: session[:user_id], post_id: params[:post_id]), status: :created
end

def destroy
    PostLike.find_by!(user_id: session[:user_id], post_id: params[:post_id]).destroy
    head :no_content
end


end
