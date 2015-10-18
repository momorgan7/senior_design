json.array!(@gigapans) do |gigapan|
  json.extract! gigapan, :id, :name, :project, :gig_id, :description
  json.url gigapan_url(gigapan, format: :json)
end
