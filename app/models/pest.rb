class Pest < ApplicationRecord
    has_many :plant_pests, dependent: :destroy
    has_many :plants, through: :plant_pests

    validates :name, presence: true, uniqueness: { case_sensitive: false }
    validates :description, presence: true
    validates :preventatives, presence: true
end
