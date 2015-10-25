class Comment < ActiveRecord::Base
    belongs_to :project_gigapan
    belongs_to :user
end
