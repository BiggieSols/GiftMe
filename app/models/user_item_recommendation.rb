class UserItemRecommendation < ActiveRecord::Base
  attr_accessible :from_user_id, :item_id, :to_user_id

  belongs_to :user_from, foreign_key: :from_user_id, class_name: "User"
  belongs_to :user_to, foreign_key: :to_user_id, class_name: "User"
  belongs_to :item
end