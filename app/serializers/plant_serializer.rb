class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :care
  has_many :locations
  has_many :months
end
