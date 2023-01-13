class Month < ApplicationRecord
    has_many :plant_location_months, dependent: :destroy
    has_many :plants, through: :plant_location_months

    validates :name, presence: true, uniqueness: { case_sensitive: false }
end
