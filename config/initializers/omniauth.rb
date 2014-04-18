OmniAuth.config.logger = Rails.logger

fb_permissions = [
                "email", 
                "user_about_me", 
                "user_location", 
                "user_birthday", 
                "user_interests", 
                "publish_stream", 
                "friends_birthday", 
                "friends_interests", 
                "friends_about_me", 
                "friends_friends"
              ]

Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.development?
    fb_app_id = ENV['FACEBOOK_APP_ID']
    fb_app_secret = ENV['FACEBOOK_SECRET']
  else
    fb_app_id = ENV['FACEBOOK_APP_ID']#_PROD']
    fb_app_secret = ENV['FACEBOOK_SECRET']#_PROD']
  end

  provider :facebook, fb_app_id, 
                      fb_app_secret, 
                      scope: fb_permissions.join(", ")
end
