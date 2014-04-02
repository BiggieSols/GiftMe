class AddFriendIdsToUser < ActiveRecord::Migration
  def change
    add_column :users, :friend_uids, :text
  end
end
