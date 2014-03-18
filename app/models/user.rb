class User < ActiveRecord::Base
  attr_accessible :name, :oauth_expires_at, :oauth_token, :provider, :uid

  has_many :wanted_user_items
  has_many :wanted_items, through: :wanted_user_items, source: :item

  has_many :unwanted_user_items     
  has_many :unwanted_items, through: :unwanted_user_items, source: :item

  has_many :given_user_item_recommendations, 
              foreign_key: :from_user_id, 
              class_name: "UserItemRecommendation"

  has_many :received_user_item_recommendations, 
              foreign_key: :to_user_id, 
              class_name: "UserItemRecommendation"

  has_many :given_recommended_items, through: :given_user_item_recommendations, source: :item
  has_many :received_recommended_items, through: :received_user_item_recommendations, source: :item

  def self.from_omniauth(auth)
    # Note: auth object is a OmniAuth::AuthHash

    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end

  def facebook
    @facebook ||= Koala::Facebook::API.new(oauth_token)
  end
end
