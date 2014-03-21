json.array!(@recommendations) do |recommendation|
  item = recommendation.item
  recommending_user = recommendation.user_from
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
              :title,
              :updated_at
        )
  json.recommending_user do
    json.(recommending_user, :id, :name, )
  end 
end

