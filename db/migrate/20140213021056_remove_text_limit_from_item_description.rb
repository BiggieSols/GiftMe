class RemoveTextLimitFromItemDescription < ActiveRecord::Migration
  def change
    change_column :items, :description, :text, :limit => nil
  end

end
