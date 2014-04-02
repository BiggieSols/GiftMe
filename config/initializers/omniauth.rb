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
  provider :facebook, ENV['FACEBOOK_APP_ID'], 
                      ENV['FACEBOOK_SECRET'], 
                      scope: fb_permissions.join(", ")
end
