class UsersController < ApplicationController
      before_filter :authenticate_user!
 def index
 end

 def show
    @user = User.find(params[:id])
 end

 def new
    @user = User.new
 end

 def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
           flash[:success] = "Profile updated"
      redirect_to @user
    else
      render 'edit'
    end
 end
 
 def edit
    @user = User.find(params[:id])
 end
 
 def destroy
 end

 def create
    @user = User.new(user_params)
  #  @user.update_attribute(:organization_id, current_user.organization.1)
    @user.roles << Role.where(name: "student")
#    @user.email = current_user.email
    if @user.save
      flash[:success] = "Created a new student:"+@user.first_name+" "+@user.last_name
      redirect_to dashboard_path
    else
        flash[:errors] = "Failed to create:"+@user.first_name+" "+@user.last_name
        render 'new'
    end
 end
 
  
  private

    def user_params
      params.require(:user).permit(:username, :email, :password,
                                   :password_confirmation, :avatar, :first_name, :last_name, :cont_area, 
                                   :organization_id, role_ids: [])
    end
    
end
