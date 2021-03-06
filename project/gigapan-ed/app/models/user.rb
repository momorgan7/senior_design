class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :lockable
         
        mount_uploader :avatar, AvatarUploader 
 has_and_belongs_to_many :roles
 has_and_belongs_to_many :projects
 has_many :project_gigapans, through: :projects
 has_many :comments
 belongs_to :organization#, inverse_of: :organization
 
 
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

#defines that login will accept a username for authentication
  # def login
  #   @login || self.username
  # end
  
  # def self.find_for_database_authentication(warden_conditions)
  #   conditions = warden_conditions.dup
  #     if login = conditions.delete(:login)
  #       where(conditions.to_hash).where(["lower(username) = :value", { :value => login.downcase }]).first
  #     else
  #       where(conditions.to_hash).first
  #     end
  # end
  
  #custom devise validations to replace validateable because of the issues with using multiple of the same email
  validates_presence_of    :email, :on=>:create
  validates_format_of    :email,    :with  => Devise.email_regexp, :allow_blank => true, :if => :email_changed?
  # validates_presence_of    :password, :on=>:create
  # validates_presence_of :password_confirmation, :on=>:create
  # validates_confirmation_of    :password, :on=>:create
  # validates_length_of    :password, :within => Devise.password_length, :allow_blank => true
  
  
  #requires a username on creation of a user
  validates :username,
  :presence => true,
  :uniqueness => { :case_sensitive => false},
  length: { maximum: 50 }
  
  validates :roles,
  :presence => true
  
  validates :first_name,
  :presence => true
  
  validates :password,
  :presence => true,
  length: { minimum: 6 }, allow_nil: true
  
  validates :password_confirmation,
  :presence => true,
  length: { minimum: 6 }, allow_nil: true
  
  validates :organization_id,
  :presence => true
  
  
end

