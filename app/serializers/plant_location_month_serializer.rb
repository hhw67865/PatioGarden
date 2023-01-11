class PlantLocationMonthSerializer < ActiveModel::Serializer
  attributes :id
  has_one :plant
  has_one :location
  has_one :month
end
