json.array!(@friends) do |friend|
  json.partial!('users/user', user: friend)
end