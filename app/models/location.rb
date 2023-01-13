class Location < ApplicationRecord
    has_many :plant_location_months, dependent: :destroy
    has_many :plants, through: :plant_location_months
    has_many :users

    validates :name, presence: true, uniqueness: { case_sensitive: false }
end
