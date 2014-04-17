class UserMailer < ActionMailer::Base
  default from: "support@giftscore.com"

  def welcome_email(user)
    @user = user
    @url  = 'http://giftmefacebook.herokuapp.com'
    mail(to: user.email, subject: 'Welcome to GiftScore!')
  end

  def friend_join_email(friend, new_user)
    @friend = friend
    @new_user = new_user
    mail(to: new_user.email, subject: "#{friend.name} just started using GiftScore!")
  end
end
