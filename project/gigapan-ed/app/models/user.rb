class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
        mount_uploader :avatar, AvatarUploader 
 has_many :user_roles, :dependent => :destroy
 has_many :roles, :through => :user_roles
 
 RailsAdmin.config {|c| c.label_methods << :username}
  
  #checks is a user is of a given role
  def has_role?(name)
    roles.pluck(:name).member?(name.to_s)
  end
  
  #checks if a user has any role at all
  def role_exists?
    roles.presence
  end
  
  def login=(login)
    @login = login
  end

#defines that login will accept a username or email for authentication
  def login
    @login || self.username || self.email
  end
  
  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
      if login = conditions.delete(:login)
        where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
      else
        where(conditions.to_h).first
      end
  end
    
    #requires a username on creation of a user
  validates :username,
  :presence => true,
  :uniqueness => { :case_sensitive => false}, # etc.
  length: { maximum: 50 }
  
  validates :password,
  :presence => true,
  length: { minimum: 6 }
  
  validates :password_confirmation,
  :presence => true,
  length: { minimum: 6 }
  
end

