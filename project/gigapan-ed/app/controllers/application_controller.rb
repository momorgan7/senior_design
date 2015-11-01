class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_devise_params, if: :devise_controller?
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to '/' , :alert => exception.message
  end
  def authorize
    redirect_to root_path unless current_user && current_user.role_exists?
  end
  def configure_devise_params
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:username, :email, :password, :password_confirmation)
    end
  end
  
  protected
  def authenticate_user!
    if user_signed_in?
      super
    else
      redirect_to login_path
    end
  end
end
