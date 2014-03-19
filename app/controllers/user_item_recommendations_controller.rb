class UserItemRecommendationsController < ApplicationController
  def create
    recommendation = UserItemRecommendation.new(  
                                                  item_id: params[:item_id], 
                                                  from_user_id: current_user.id, 
                                                  to_user_id: params[:user_id]
                                               )
    recommendation.save
    head :ok
    # render json: recommendation
  end

  def destroy
  end
end
