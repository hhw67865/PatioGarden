class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :description, :skill_level, :image_url
  
  belongs_to :location
  has_many :posts
  has_many :followers, serializer: FollowersSerializer
  has_many :following, serializer: FollowingSerializer
  has_many :plants




  

 


end
