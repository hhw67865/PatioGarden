class PlantPest < ApplicationRecord
  belongs_to :plant
  belongs_to :pest

  validates :plant, uniqueness: {scope: :pest, message: "A plant cannot have the same pest twice"}
end
