class MessageChannel < ApplicationCable::Channel
  def subscribed
    
    
    conversation = create_conversation(params[:sender_username].downcase, params[:receiver_username].downcase)
    # byebug
    stream_from "#{conversation}"
  end


  def unsubscribed
    stop_all_streams
  end

  def create_conversation (user_1, user_2)
    if (user_1<user_2)
        "direct_messages_#{user_1}#{user_2}"
    else
        "direct_messages_#{user_2}#{user_1}"
    end
  end

  
end
