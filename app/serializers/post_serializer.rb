class PostSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  include Rails.application.routes.url_helpers

  attributes :id, :title, :post_body, :created_at_ago
  
  belongs_to :user
  belongs_to :plant
  has_many :tags
  has_many :comments
  has_many :pictures
  has_many :liked_users


  def created_at_ago
    "#{time_ago_in_words(object.created_at)} ago"
  end

  def pictures
    if object.pictures.attached?
      object.pictures.all.map{|picture| rails_blob_url(picture)}
    end
  end

end
