class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    
    alias_action :create, :update, :destroy, :to => :alter
    
   
    if user.id  
      if user.has_role?(:admin)
        can :access, :rails_admin
        can :dashboard
        can :manage, :all
        can :import, [User]
      elsif user.has_role?(:teacher)
        can :alter, Project
        can :alter, Organization
        can :read, :all
      else
        can :read, :all
      end
    end
    
    
    
    #Here the user will only have permission to read active projects which he owns.
    #can :read, Project, :active => true, :user_id => user.id
    
    # Here the project can only be read if the category it belongs to is visible.
    # can :read, Project, :category => { :visible => true }
    
# class Photo
#   has_and_belongs_to_many :groups
#   scope :unowned, includes(:groups).where(:groups => {:id => nil})
# end

# class Group
#   has_and_belongs_to_many :photos
# end

# class Ability
#   def initialize(user)
#     user ||= User.new # guest user (not logged in)
#     can :read, Photo, Photo.unowned do |photo|
#       photo.groups.empty?
#     end
#   end
# end
    
    
    
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
