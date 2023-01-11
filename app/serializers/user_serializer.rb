class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :password_digest, :email, :description, :skill_level
  has_one :location
end
