json.array!(@recommendations) do |recommendation|
  item = recommendation.item
  recommending_user = recommendation.user_from
  json.item (item)
  json.recommending_user do
    json.(recommending_user, :id, :name, :small_picture_url)
  end 
end