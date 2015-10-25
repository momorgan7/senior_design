class ProjectGigapan < ActiveRecord::Base
    belongs_to :project
    has_one :gigapan
    has_many :comments
end
