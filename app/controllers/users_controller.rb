class UsersController < ApplicationController
  def index
    @users = current_user.friends #scoped.includes(:wanted_items)
    @users << current_user
    render 'index.json.jbuilder'
  end

  def show
    user_id = params[:id] == "current" ? current_user.id : params[:id]
    @user = User.find(user_id)
    render 'show.json.jbuilder'
  end

  def update
    puts "\n"*10
    puts params
    puts "\n"*10
    current_user.wanted_item_ids = params[:wanted_item_ids]
    @user = current_user
    render 'show.json.jbuilder'
  end
end