class AddAccountActiveToUsers < ActiveRecord::Migration
  def change
    add_column :users, :account_active, :boolean, default: false
    add_index :users, :account_active
  end
end
