class Post < ApplicationRecord
  
  belongs_to :user
  belongs_to :plant
  has_many :comments, dependent: :destroy
  has_many :users_who_commented, through: :comments, source: :user

  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags

  has_many_attached :pictures

  validates :title, presence: true
  validates :post_body, presence: true
  
end
