OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_APP_ID'], 
                      ENV['FACEBOOK_SECRET'], 
                      scope: "email, user_about_me, user_location, user_birthday, user_interests, publish_stream, friends_birthday, friends_interests, friends_about_me"
end
