class PlantProblem < ApplicationRecord
  belongs_to :plant
  belongs_to :problem

  validates :plant, uniqueness: {scope: :problem, message: "A plant cannot have the same problem twice"}
end
