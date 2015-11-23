class ProjectGigapan < ActiveRecord::Base
    belongs_to :project
    has_many :comments, :dependent => :destroy
    attr_accessor :url

  def url
    @url
  end

    
  
    validates :name,
    :presence => true,
    length: { minimum: 6 }
end
