class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :ASIN
      t.string :detail_page_url
      t.string :large_image_url
      t.string :small_image_url
      t.string :medium_image_url
      t.text :description
      t.string :category
      t.integer :price
      t.string :currency
      t.string :title

      t.timestamps
    end

    add_index :items, :price
    add_index :items, :category
    add_index :items, :ASIN
  end
end
