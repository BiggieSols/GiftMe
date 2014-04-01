class ItemsController < ApplicationController
  def index
    # fail
    category = params[:category]
    uid = params[:user_id]
    min_price = params[:min_price]
    max_price = params[:max_price]
    recommended = params[:recommended]


    # show all items
    if !uid
      # note: looks like Redis is actually slowing this down anyway. work on more optimized solution later
      # return AR:Relation of all items
      # @items = Rails.cache.fetch("item_index", expire_in: 12.hours) do
      #   Item.where("id > 0")
      # end
      @items = Item.where("id > 0").includes(:recommending_users)
    elsif !recommended
      # wont bother putting this into Redis for now
      @items = User.find(params[:user_id]).wanted_items.includes(:recommending_users)
    else
      @items = User.find(params[:user_id])
                   .received_recommended_items
                   .includes(:recommending_users)

      puts "\n"*5
      puts "retrieving recommended items"
      puts "\n"*5
    end
    
    # lazy-query all included constraints
    @items = @items.where("category = ?", category) if category && category != "all"
    @items = @items.where("price >= ?", min_price.to_i) if min_price
    @items = @items.where("price <= ?", max_price.to_i) if max_price

    # add pagination
    @page_number = params[:page_number]
    @items = @items.page(@page_number).per(20)

    render 'index.json.jbuilder' 
    # render json: {
    #                models: @items,
    #                page_number: params[:page_number], 
    #                total_pages: @items.total_pages
    #              }
  end

  def show
    @item = Item.find(params[:id])
    render json: @item
  end
end
