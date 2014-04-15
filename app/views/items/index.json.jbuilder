json.models do
  json.array!(@items) do |item|
    json.(item, :asin,
      :category,
      :created_at,
      :currency,
      :description,
      :detail_page_url,
      :id,
      :small_image_url,
      :large_image_url,
      :medium_image_url,
      :price,
      :shortened_title,
      :updated_at,
      :recommending_users
      )
  end
end

json.page_number(@page_number)
json.total_pages(@items.total_pages)