class Project < ActiveRecord::Base
    has_and_belongs_to_many :users , :inverse_of => :project
    has_many :project_gigapans, :dependent => :destroy
    has_many :comments, through: :project_gigapans
    
    validates :name,
    :presence => true,
    length: { maximum: 50 }
    
    

  
    
end
