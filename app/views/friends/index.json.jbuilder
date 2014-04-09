json.array!(@friends) do |friend|
  json.partial!('users/user_lite', user: friend)
end