class PestSerializer < ActiveModel::Serializer
  attributes :id, :name,:image_url, :description, :preventatives
end
