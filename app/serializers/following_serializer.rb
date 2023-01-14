class FollowingSerializer < ActiveModel::Serializer
  attributes :id, :name, :username


  def id
    User.find(self.object.followed_id).id
  end

  def name
    User.find(self.object.followed_id).name
  end

  def username
    User.find(self.object.followed_id).username
  end
end
