class PlantProblemSerializer < ActiveModel::Serializer
  attributes :id
  has_one :plant
  has_one :problem
end
