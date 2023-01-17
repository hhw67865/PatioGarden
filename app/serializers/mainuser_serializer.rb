class MainuserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email, :description, :skill_level, :image_url
  has_one :location
  has_many :posts
  has_many :followers, serializer: FollowersSerializer
  has_many :following, serializer: FollowingSerializer
  has_many :plants
  
end
