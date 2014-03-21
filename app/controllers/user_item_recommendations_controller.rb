class UserItemRecommendationsController < ApplicationController
  def index
    user_id = params[:user_id] || current_user.id
    @recommendations = UserItemRecommendation.includes(:item, :user_from)
                                             .where(to_user_id: user_id);
    render 'index.json.jbuilder'
  end

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
