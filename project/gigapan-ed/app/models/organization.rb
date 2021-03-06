class Organization < ActiveRecord::Base
    has_many :users
    has_many :projects, :through => :users
    belongs_to :country
    accepts_nested_attributes_for :users
    validates :name,
    :presence => true
    validates :city,
    :presence => true
    validates :state,
    :presence => true
    validates :country_id,
    :presence => true

end
