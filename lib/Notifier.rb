class Notifier
  def self.generate_messages(user)
    # Note: need to change this '!=' to '==' evenutally.
    if user.created_at != user.updated_at
      Notifier.send_welcome_email(user)
      Notifier.notify_user_friends(user)
    end
  end

  def self.send_welcome_email(new_user)
    msg = UserMailer.welcome_email(new_user)
    msg.deliver!  
  end

  def self.notify_user_friends(new_user)
    friend_uids = new_user.friend_uids_mutual_friend_count
                          .map {|info_hash| info_hash["uid"].to_s}

    active_friends = User.where(uid: friend_uids.map(&:to_s), account_active: true)

    active_friends.each do |friend|
      Notifier.send_friend_join_email(friend, new_user)
    end
  end

  def self.send_friend_join_email(friend, new_user)
    msg = UserMailer.friend_join_email(friend, new_user)
    msg.deliver!
  end
end