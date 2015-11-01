class Organization < ActiveRecord::Base
    has_many :users
    accepts_nested_attributes_for :users
    validates :city,
    :presence => true
    validates :state,
    :presence => true
    validates :country,
    :presence => true
end
