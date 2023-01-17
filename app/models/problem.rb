class Problem < ApplicationRecord
    has_many :plant_problems, dependent: :destroy
    has_many :plants, through: :plant_problems

    has_one_attached :image

    validates :name, presence: true, uniqueness: { case_sensitive: false }
    validates :description, presence: true
    validates :preventatives, presence: true
end
