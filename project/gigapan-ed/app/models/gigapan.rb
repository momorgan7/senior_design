class Gigapan < ActiveRecord::Base
    has_many :project_gigapans
    
    validates :name,
    :presence => true
    validates :ext_id,
    :presence => true

    
end
