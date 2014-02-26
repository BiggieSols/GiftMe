class WantedUserItemsController < ApplicationController
  def create
    current_user.wanted_item_ids += [params[:item_id]]
    head :ok
  end

  def destroy
    current_user.wanted_item_ids -= [params[:item_id]]
    head :ok
  end
end
