class ChangeAsinToAsin < ActiveRecord::Migration
  def change
    rename_column :items, :ASIN, :asin
  end
end
