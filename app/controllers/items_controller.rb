class ItemsController < ApplicationController
  def index
    # fail
    category = params[:category]
    uid = params[:user_id]
    min_price = params[:min_price]
    max_price = params[:max_price]
    from_current_user = params[:from_current_user]
    recommended = params[:recommended]

    puts "\n\n\n\n"
    puts "request params are: #{params}"
    puts "\n\n\n\n"



    # show all items
    if !uid
      # note: looks like Redis is actually slowing this down anyway. work on more optimized solution later
      # return AR:Relation of all items
      # @items = Rails.cache.fetch("item_index", expire_in: 12.hours) do
      #   Item.scoped
      # end
      @items = Item.scoped#.includes(:recommending_users)
    elsif !recommended
      # wont bother putting this into Redis for now
      @items = User.find(params[:user_id])
                   .wanted_items

    elsif !from_current_user
      @items = User.find(params[:user_id])
                   .received_recommended_items

    else
      item_ids = User.find(params[:user_id])
                     .received_user_item_recommendations
                     .where(from_user_id: current_user.id)
                     .map(&:item_id)
      @items = Item.where(id: item_ids)
    end

    
    # lazy-query all included constraints
    @items = @items.where("category = ?", category) if category && category != "all"
    @items = @items.where("price >= ?", min_price.to_i) if min_price
    @items = @items.where("price <= ?", max_price.to_i) if max_price
    @items = @items.includes :recommending_users

    # add pagination
    @page_number = params[:page_number] || 1
    @items = @items.page(@page_number).per(20)

    render 'index.json.jbuilder' 
  end

  def show
    @item = Item.find(params[:id])
    render json: @item
  end
end
