class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment_body
  has_one :post
  has_one :user
end
