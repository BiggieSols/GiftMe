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

  def self.send_rec_notifications
    users_recs_hash = Hash.new {|h, k| h[k] = []}

    # maybe create a single query for this eventually.    
    # SELECT uir.to_user_id, count(*)
    # FROM user_item_recommendations uir
    # LEFT OUTER JOIN rec_notificaitons rn
    # ON (uir.id = rn.user_item_recommendation_id)
    # WHERE rn.user_item_recommendation_id IS NULL
    # GROUP BY uir.to_user_id

    recs = UserItemRecommendation.includes(:rec_notifications).scoped
    recs.select! {|rec| rec.rec_notifications.empty? }
    user_ids = []

    recs.each do |rec|
      receiving_user_id = rec.to_user_id.to_s
      user_ids << rec.to_user_id
      users_recs_hash[receiving_user_id] << rec.id
    end

    # users_recs_hash

    users_to_email = User.where(id: user_ids, account_active: true)

    users_to_email.each do |user|
      Notifier.send_new_rec_email(user, users_recs_hash[user.id.to_s]) 
    end
  end

  def self.send_new_rec_email(user, rec_ids)
    msg = RecommendationMailer.item_recommendations_email(user, rec_ids.length)
    
    if msg.deliver
      rec_ids.each {|rec_id| RecNotification.create(user_item_recommendation_id: rec_id)}
    else
      puts "message delivery failed"
    end
  end
end