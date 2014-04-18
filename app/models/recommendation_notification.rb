class RecNotificaiton < ActiveRecord::Base
  belongs_to :user_item_recommendation
  # attr_accessible :title, :body
end
