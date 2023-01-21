class Follow < ApplicationRecord
    belongs_to :follower, class_name: "User"
    belongs_to :followed, class_name: "User"

    validates :followed, presence: true
    validates :follower, presence: true
    validates :followed, uniqueness: { scope: :follower, message: "You are already following this user" }
    validate :user_cant_follow_self

    def user_cant_follow_self
        if follower_id == followed_id
            errors.add(:follower_id, "can't follow self")
        end

    end
end
