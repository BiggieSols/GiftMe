class AddBirthdayToUser < ActiveRecord::Migration
  def change
    add_column :users, :birthday_date, :datetime
  end
end
