class AddPictureUrlsToUser < ActiveRecord::Migration
  def change
    add_column :users, :small_picture_url, :string
    add_column :users, :large_picture_url, :string

    add_index :users, :small_picture_url
    add_index :users, :large_picture_url
  end
end
