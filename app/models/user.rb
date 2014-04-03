class User < ActiveRecord::Base
  serialize :friend_uids, JSON

  attr_accessible :name, :oauth_expires_at, :oauth_token, :provider, :uid, :small_picture_url, :large_picture_url, :friend_uids

  # before_validation :get_pictures, :get_friend_ids

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

  def friends
    @friends ||= self.get_friends
  end

  def get_friend_ids
    self.friend_uids = self.facebook.fql_query(<<-FQL
      SELECT uid2
      FROM friend 
      WHERE uid1 = me()
    FQL
    ).map {|item| item["uid2"]}
  end

  def get_pictures
    pics_hash = self.facebook.fql_query(<<-FQL
      SELECT pic_small, pic_big
      FROM user
      WHERE uid = me()
    FQL
    ).first

    self.small_picture_url = pics_hash["pic_small"]
    self.large_picture_url = pics_hash["pic_big"]
  end

  def load_friend_entries

    query_results = self.facebook.fql_query(<<-FQL
      SELECT uid, name, birthday, birthday_date, pic_small, pic_big
      FROM user 
      WHERE uid in (SELECT uid2 FROM friend WHERE uid1 = me()) 
    FQL
    )

    # uids = query_results.map {|result| result.uid.to_s}
    friends = User.where(uid: self.friend_uids)

    puts "\n"*5
    p friends.map
    puts "\n"*5


    ActiveRecord::Base.transaction do
      query_results.each do |result|
        # puts "\n"*5
        # p result
        # puts "\n"*5
        user = friends.select {|friend| friend.uid == result["uid"].to_s}.first || User.new



        puts user
        # user = User.new if !user

        user.name = result["name"]
        #user.birthday_date = result["birthday_date"]
        user.uid = result["uid"]
        user.small_picture_url = result["pic_small"]
        user.large_picture_url = result["pic_big"]
        user.save
      end
    end
  end


  def facebook
    @facebook ||= Koala::Facebook::API.new(oauth_token)
  end

  private
  
  def get_friends
    user_fb_friends = current_user.facebook.get_connection("me", "friends")
    fb_friend_ids = user_fb_friends.map { |friend| friend["id"] }
    friends = User.where(uid: fb_friend_ids)
  end
end