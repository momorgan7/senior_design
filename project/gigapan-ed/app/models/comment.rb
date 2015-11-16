class Comment < ActiveRecord::Base
    belongs_to :project_gigapan
    belongs_to :user
    belongs_to :parent, :class_name => "Comment"
    has_many :comments, :foreign_key => "parent_id"
    
    validates :content,
    :presence => true
    
    validates :project_gigapan_id,
    :presence => true
  
    validates :user_id,
    :presence => true
end
