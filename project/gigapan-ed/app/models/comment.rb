class Comment < ActiveRecord::Base
    belongs_to :project_gigapan
    belongs_to :user
    belongs_to :parent, :class_name => "Comment"
    has_many :comments, :foreign_key => "parent_id", :dependent => :destroy
    # validate :must_have_all_dimensions
    
    validates :content,
    :presence => true
    
    validates :project_gigapan_id,
    :presence => true
  
    validates :user_id,
    :presence => true
    
    # def must_have_all_dimensions
    #     if(height.present? && ! width.present?)
    #         errors.add(:height,"did not have corresponding width")
    #     end
    #     if(width.present? && ! height.present?)
    #         errors.add(:width,"did not have corresponding height")
    #     end
    #     if(x_coord.present? && ! y_coord.present?)
    #         errors.add(:x_coord,"did not have corresponding y coord")
    #     end
    #     if(y_coord.present? && ! x_coord.present?)
    #         errors.add(:y_coord,"did not have corresponding x coord")
    #     end
    #     if(y_coord.present? && ! height.present?)
    #         errors.add(:y_coord,"did not have corresponding height")
    #     end
    #     if(x_coord.present? && ! width.present?)
    #         errors.add(:x_coord,"did not have corresponding width")
    #     end
    #     if(height.present? && ! y_coord.present?)
    #         errors.add(:height,"did not have corresponding y coord")
    #     end
    #     if(width.present? && ! x_coord.present?)
    #         errors.add(:width,"did not have corresponding x coord")
    #     end
    # end
end
