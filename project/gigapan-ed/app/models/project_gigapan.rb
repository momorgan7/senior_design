class ProjectGigapan < ActiveRecord::Base
    belongs_to :project
    has_many :comments, :dependent => :destroy
    attr_accessor :url
    validate :private_must_have_authcode
    
    def url
      @url
    end

    validates :project_id,
    :presence => true
  
    validates :ext_id,
    :presence => true
    
    validates :height,
    :presence => true
    
    validates :width,
    :presence => true
    
    validates :name,
    :presence => true,
    length: { minimum: 6 }
    
    def private_must_have_authcode
      if(private && !authcode.present?)
        errors.add(:authcode, "missing, gigapan cannot be displayed")
      end
    end
end
