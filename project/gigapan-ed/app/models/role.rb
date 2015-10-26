class Role < ActiveRecord::Base
  has_many :user_roles, :dependent => :destroy
  has_many :users, :through => :user_roles
  
  RailsAdmin.config {|c| c.label_methods << :name}
  
  validates :name,
  :presence => true,
  :uniqueness => { :case_sensitive => false}, # etc.
  length: { maximum: 50 }
  
end