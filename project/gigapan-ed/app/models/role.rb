class Role < ActiveRecord::Base
  has_many :user_roles, :dependent => :destroy
  has_many :users, :through => :user_roles
  
  RailsAdmin.config {|c| c.label_methods << :name}
end