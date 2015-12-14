class RegistrationsController < Devise::RegistrationsController  
    respond_to :json
  skip_before_filter :require_no_authentication, only: [:new, :create]

  def new
    super
  end
end  