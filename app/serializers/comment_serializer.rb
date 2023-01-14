class CommentSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper

  attributes :id, :comment_body, :created_at_ago
  has_one :post
  has_one :user

  def created_at_ago
    "#{time_ago_in_words(object.created_at)} ago"
  end
end
