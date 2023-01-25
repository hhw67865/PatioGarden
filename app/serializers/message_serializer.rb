class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body,:sender, :receiver

  def sender
    User.find(object.sender_id)
  end

  def receiver
    User.find(object.receiver_id)
  end
end
