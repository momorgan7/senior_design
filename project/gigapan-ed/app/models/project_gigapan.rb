class ProjectGigapan < ActiveRecord::Base
    belongs_to :project
    belongs_to :gigapan
    has_many :comments
    
    validates :project_id,
    :presence => true
  
    validates :gigapan_id,
    :presence => true
  
    validates :name,
    :presence => true,
    length: { minimum: 6 }
end
