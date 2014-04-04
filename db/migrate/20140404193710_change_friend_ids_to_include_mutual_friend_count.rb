class ChangeFriendIdsToIncludeMutualFriendCount < ActiveRecord::Migration
  def change
    rename_column :users, :friend_uids, :friend_uids_mutual_friend_count
  end
end
