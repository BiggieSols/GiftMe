class ItemsController < ApplicationController
  def index
    # fail
    category = params[:category]
    uid = params[:user_id]
    min_price = params[:min_price]
    max_price = params[:max_price]

    if !uid
      # return AR:Relation of all items
      @items = Item.where("id > 0")
    else
      @items = User.find(params[:user_id]).wanted_items
    end
    
    # lazy-query all included constraints
    @items = @items.where("category = ?", category) if category && category != "all"
    @items = @items.where("price >= ?", min_price.to_i) if min_price
    @items = @items.where("price <= ?", max_price.to_i) if max_price

    render json: @items
  end


  def show
    @item = Item.find(params[:id])
    render json: @item
  end
end
