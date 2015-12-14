class Country < ActiveRecord::Base
    has_many :organizations
    
    validates :name,
    :presence => true
    
    validates :iso_code,
    :presence => true
end
