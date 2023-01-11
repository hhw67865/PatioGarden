class PestSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :preventatives
end
