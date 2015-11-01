class Comment < ActiveRecord::Base
    belongs_to :project_gigapan
    belongs_to :user
    
    validates :com_type,
    :presence => true
    
    validates :content,
    :presence => true
    
    validates :project_gigapan_id,
    :presence => true
  
    validates :user_id,
    :presence => true
end
