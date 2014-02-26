class UsersController < ApplicationController
  def show
    user_id = params[:id] == "current" ? current_user.id : params[:id]
    @user = User.find(user_id)
    render 'show.json.jbuilder'
  end
end