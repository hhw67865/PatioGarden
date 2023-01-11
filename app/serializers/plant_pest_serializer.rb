class PlantPestSerializer < ActiveModel::Serializer
  attributes :id
  has_one :plant
  has_one :pest
end
