namespace :scheduler do
  desc "This task is called by the Heroku scheduler add-on"
  
  task :send_item_rec_emails => :environment do
    Notifier.send_rec_notifications
  end

  task :send_reminders => :environment do
    User.send_reminders
  end
end
