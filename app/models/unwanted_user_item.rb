class UnwantedUserItem < ActiveRecord::Base
attr_accessible :user, :item
  belongs_to :user
  belongs_to :item
end
