class Plant < ApplicationRecord
    has_many :posts, dependent: :destroy
    has_many :plant_pests, dependent: :destroy
    has_many :pests, through: :plant_pests

    has_many :plant_problems, dependent: :destroy
    has_many :problems, through: :plant_problems

    has_many :plant_location_months, dependent: :destroy
    has_many :locations, through: :plant_location_months
    has_many :months, through: :plant_location_months

    validates :name, presence: true, uniqueness: { case_sensitive: false }
    validates :description, presence: true
    validates :care, presence: true
end
