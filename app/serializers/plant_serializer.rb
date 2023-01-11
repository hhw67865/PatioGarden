class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :care
end
