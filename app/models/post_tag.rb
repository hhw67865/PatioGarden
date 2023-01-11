class PostTag < ApplicationRecord
  belongs_to :post
  belongs_to :tag

  validates :post, uniqueness: { scope: :tag, message: "A Post cannot have the same tag twice" }
end
