class RecNotification < ActiveRecord::Base
  belongs_to :user_item_recommendation
  attr_accessible :user_item_recommendation_id
end
