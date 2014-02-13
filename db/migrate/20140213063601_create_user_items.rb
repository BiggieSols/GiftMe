class CreateUserItems < ActiveRecord::Migration
  def change
    create_table :wanted_user_items do |t|
      t.references :user, null: false
      t.references :item, null: false

      t.timestamps
    end
    add_index :wanted_user_items, :user_id
    add_index :wanted_user_items, :item_id
  end
end
