class MainuserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email, :description, :skill_level, :image_url, :liked_posts_id
  has_one :location
  has_many :posts
  has_many :followers, serializer: FollowersSerializer
  has_many :following, serializer: FollowingSerializer
  has_many :plants
  has_many :liked_posts

  def liked_posts_id
    object.liked_posts.map{|post| post.id}
  end
  
end
