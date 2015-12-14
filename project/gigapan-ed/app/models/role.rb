class Role < ActiveRecord::Base
  has_and_belongs_to_many :users
  
  RailsAdmin.config {|c| c.label_methods << :name}
  
  validates :name,
  :presence => true,
  :uniqueness => { :case_sensitive => false}, # etc.
  length: { maximum: 50 }
  
end