# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140417212857) do

  create_table "delayed_jobs", :force => true do |t|
    t.integer  "priority",   :default => 0, :null => false
    t.integer  "attempts",   :default => 0, :null => false
    t.text     "handler",                   :null => false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "delayed_jobs", ["priority", "run_at"], :name => "delayed_jobs_priority"

  create_table "items", :force => true do |t|
    t.string   "asin"
    t.string   "detail_page_url"
    t.string   "large_image_url"
    t.string   "small_image_url"
    t.string   "medium_image_url"
    t.text     "description"
    t.string   "category"
    t.integer  "price"
    t.string   "currency"
    t.string   "title"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "items", ["asin"], :name => "index_items_on_ASIN"
  add_index "items", ["category"], :name => "index_items_on_category"
  add_index "items", ["price"], :name => "index_items_on_price"

  create_table "unwanted_user_items", :force => true do |t|
    t.integer  "user_id"
    t.integer  "item_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "unwanted_user_items", ["item_id"], :name => "index_unwanted_user_items_on_item_id"
  add_index "unwanted_user_items", ["user_id"], :name => "index_unwanted_user_items_on_user_id"

  create_table "user_item_recommendations", :force => true do |t|
    t.integer  "from_user_id", :null => false
    t.integer  "to_user_id",   :null => false
    t.integer  "item_id",      :null => false
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "user_item_recommendations", ["from_user_id"], :name => "index_user_item_recommendations_on_from_user_id"
  add_index "user_item_recommendations", ["item_id"], :name => "index_user_item_recommendations_on_item_id"
  add_index "user_item_recommendations", ["to_user_id"], :name => "index_user_item_recommendations_on_to_user_id"

  create_table "users", :force => true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",                                         :null => false
    t.datetime "updated_at",                                         :null => false
    t.string   "small_picture_url"
    t.string   "large_picture_url"
    t.text     "friend_uids_mutual_friend_count"
    t.date     "birthday_date"
    t.boolean  "account_active",                  :default => false
    t.string   "email"
  end

  add_index "users", ["account_active"], :name => "index_users_on_account_active"
  add_index "users", ["large_picture_url"], :name => "index_users_on_large_picture_url"
  add_index "users", ["small_picture_url"], :name => "index_users_on_small_picture_url"
  add_index "users", ["uid"], :name => "index_users_on_uid"

  create_table "wanted_user_items", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "item_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "wanted_user_items", ["item_id"], :name => "index_wanted_user_items_on_item_id"
  add_index "wanted_user_items", ["user_id"], :name => "index_wanted_user_items_on_user_id"

end
