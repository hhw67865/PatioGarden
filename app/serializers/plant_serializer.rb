class PlantSerializer < ActiveModel::Serializer
  attributes :id, :name,:image_url, :description, :care
  has_many :locations
  has_many :months
  has_many :problems
  has_many :pests
end
