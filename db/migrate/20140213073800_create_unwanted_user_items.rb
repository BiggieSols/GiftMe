class CreateUnwantedUserItems < ActiveRecord::Migration
  def change
    create_table :unwanted_user_items do |t|
      t.references :user
      t.references :item

      t.timestamps
    end
    add_index :unwanted_user_items, :user_id
    add_index :unwanted_user_items, :item_id
  end
end
