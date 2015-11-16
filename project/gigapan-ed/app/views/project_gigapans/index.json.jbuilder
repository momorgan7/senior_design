json.array!(@project_gigapans) do |project_gigapan|
  json.extract! project_gigapan, :id
  json.url project_gigapan_url(project_gigapan, format: :json)
end
