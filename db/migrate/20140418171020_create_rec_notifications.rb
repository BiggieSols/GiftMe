class CreateRecNotifications < ActiveRecord::Migration
  def change
    create_table :rec_notifications do |t|
      t.references :user_item_recommendation

      t.timestamps
    end
    add_index :rec_notifications, :user_item_recommendation_id
  end
end
