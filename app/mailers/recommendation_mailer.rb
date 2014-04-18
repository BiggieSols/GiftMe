class RecommendationMailer < ActionMailer::Base
  default from: "support@giftscore.com"

  # eventually may change to show actual items. start with counts.
  def item_recommendations(user, item_count)
    @user = user;
    @item_count = item_count
  end
end
