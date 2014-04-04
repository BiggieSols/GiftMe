class FriendsController < ApplicationController
  def index
    # user_fb_friends = current_user.facebook.get_connection("me", "friends")
    # fb_friend_ids = user_fb_friends.map { |friend| friend["id"] }
    # @friends = User.where(uid: fb_friend_ids)
    @friends = current_user.friends
    render 'index.json.jbuilder'
  end
end
