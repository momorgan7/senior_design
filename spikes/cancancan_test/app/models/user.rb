class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
 has_many :user_roles, :dependent => :destroy
 has_many :roles, :through => :user_roles
  
  def has_role?(name)
    roles.pluck(:name).member?(name.to_s)
  end
  def role_exists?
    roles.presence
  end
end
