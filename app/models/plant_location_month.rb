class PlantLocationMonth < ApplicationRecord
  belongs_to :plant
  belongs_to :location
  belongs_to :month

  validates :plant, uniqueness: {scope: :location, message: "A plant cannot have the same location twice"}
  validates :plant, uniqueness: {scope: :month, message: "A plant cannot have the same month twice"}
end
