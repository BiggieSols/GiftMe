class CreateUserGiftRecommendations < ActiveRecord::Migration
  def change
    create_table :user_item_recommendations do |t|
      t.integer :from_user_id, null: false
      t.integer :to_user_id, null: false
      t.integer :item_id, null: false

      t.timestamps
    end

    add_index :user_item_recommendations, :from_user_id
    add_index :user_item_recommendations, :to_user_id
    add_index :user_item_recommendations, :item_id
  end
end
