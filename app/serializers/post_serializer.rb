class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :post_body
  has_one :user
  has_one :plant
end
