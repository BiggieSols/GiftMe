class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    User.current_user = user
    session[:user_id] = user.id
    redirect_to "/#/items"
  end

  def destroy
    session[:user_id] = nil
    User.current_user = nil
    redirect_to root_url
  end
end
