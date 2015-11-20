class ProjectGigapan < ActiveRecord::Base
    belongs_to :project
    has_many :comments
    
    validates :project_id,
    :presence => true
  
    validates :ext_id,
    :presence => true
    validates :authcode,
    :presence => true
    validates :width,
    :presence => true
    validates :height,
    :presence => true  
    validates :name,
    :presence => true,
    length: { minimum: 6 }
end
