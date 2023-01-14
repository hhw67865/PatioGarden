class FollowersSerializer < ActiveModel::Serializer
  attributes :id, :name, :username


  def id
    User.find(self.object.follower_id).id
  end

  def name
    User.find(self.object.follower_id).name
  end
  def username
    User.find(self.object.follower_id).username
  end
end
