class ProblemSerializer < ActiveModel::Serializer
  attributes :id,:image_url, :name, :description, :preventatives
end
