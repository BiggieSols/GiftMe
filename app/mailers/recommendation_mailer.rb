class RecommendationMailer < ActionMailer::Base
  default from: "support@giftscore.com"

  # eventually may change to show actual items. start with counts.
  def item_recommendations_email(user, item_count)
    @user = user;
    @item_count = item_count
    mail(to: @user.email, subject: "you have #{@item_count} new gift recommmendations from your friends!")
  end
end
