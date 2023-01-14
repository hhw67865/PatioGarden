class PostSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  attributes :id, :title, :post_body, :created_at_ago
  
  belongs_to :user
  belongs_to :plant
  has_many :tags
  has_many :comments


  def created_at_ago
    "#{time_ago_in_words(object.created_at)} ago"
  end

end
