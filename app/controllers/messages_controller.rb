class MessagesController < ApplicationController
def index
  render json: Message.all, status: :ok
end

def show
  render json: Message.find(params[:id]), status: :ok
end

def get_conversation
    all_conversation = Message.all.where("sender_id = ? and receiver_id = ?", User.find_by!(username: params[:sender_username]).id, User.find_by!(username: params[:receiver_username]).id).or(Message.all.where("receiver_id = ? and sender_id = ?", User.find_by!(username: params[:sender_username]).id, User.find_by!(username: params[:receiver_username]).id)).order(created_at: :desc)
    

    
    render json: all_conversation, status: :ok
end

def create

    receiver_id = User.find_by!(username: params[:receiver_username]).id
    new_message = Message.create!(body: params[:body], sender_id: session[:user_id], receiver_id: receiver_id)
    conversation = create_conversation(params[:receiver_username].downcase, User.find(session[:user_id]).username.downcase)
    ActionCable.server.broadcast(conversation, {
        id: new_message.id,
        body:new_message.body,
        sender: User.find(new_message.sender_id),
        receiver: User.find(new_message.receiver_id)
    })
    # byebug
    render json: new_message, status: :created
end

def update
  instance = Message.find(params[:id])
  instance.update!(model_params)
  render json: instance, status: :accepted
end

def destroy
  Message.find(params[:id]).destroy
  head :no_content
end

private

def model_params
  params.permit(:body)
end


def create_conversation (user_1, user_2)
    if (user_1<user_2)
        "direct_messages_#{user_1}#{user_2}"
    else
        "direct_messages_#{user_2}#{user_1}"
    end
end


end

