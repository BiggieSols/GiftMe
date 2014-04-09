json.array!(@users) do |user|
  json.partial!('users/user_lite', user: user)
end