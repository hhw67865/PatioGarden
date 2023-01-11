class Problem < ApplicationRecord
    has_many :plant_problems, dependent: :destroy
    has_many :plants, through: :plant_problems

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true
    validates :preventatives, presence: true
end
