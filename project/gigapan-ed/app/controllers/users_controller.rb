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
    if @user.save
      flash[:success] = "Welcome to the Sample App!"
      redirect_to @user
    else
      render 'new'
    end
 end
 

  private

    def user_params
      params.require(:user).permit(:username, :email, :password,
                                   :password_confirmation, :avatar)
    end
end
