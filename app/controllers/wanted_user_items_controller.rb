class WantedUserItemsController < ApplicationController
  def create
    current_user.wanted_item_ids += [params[:wanted_item_id]]
    head :ok
  end

  def destroy
  end
end
