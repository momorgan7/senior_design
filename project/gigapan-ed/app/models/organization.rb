class Organization < ActiveRecord::Base
    has_many :users
    has_many :projects, :through => :users
    belongs_to :country
    accepts_nested_attributes_for :users
    validates :city,
    :presence => true
    validates :state,
    :presence => true
    validates :country,
    :presence => true

end
