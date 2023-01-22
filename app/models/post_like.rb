class PostLike < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates :user, uniqueness: {scope: :post, message: "User can only like a post once"}
end
