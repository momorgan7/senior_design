class Project < ActiveRecord::Base
    has_and_belongs_to_many :users
    has_many :project_gigapans, :dependent => :destroy
    has_many :comments, through: :project_gigapans
    has_many :organizations, through: :users
    validates :name,
    :presence => true,
    length: { maximum: 50 }
    
    
def distinct_org 
 organization.pluck('DISTINCT organization_id')
end 
    
end
