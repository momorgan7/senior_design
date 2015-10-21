json.array!(@gigapans) do |gigapan|
  json.extract! gigapan, :id
  json.url gigapan_url(gigapan, format: :json)
end
