RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  ## == Cancan ==
   config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except "Role"
    end
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
    
  end
  config.model "User" do
    edit do
      field :username
      field :email
      field :password
      field :password_confirmation
      field :roles
      field :avatar
    end
    show do
      field :username
      field :email
      field :sign_in_count
      field :last_sign_in_at
      field :roles
      field :avatar
    end
    list do
      field :username
      field :email
      field :sign_in_count
      field :last_sign_in_at
      field :roles
    end
  end
  
  config.model "Role" do
    edit do
      field :users
    end
    show do
      field :name
      field :users
    end
    list do
      field :name
      field :users
    end
  end
  
  
  config.excluded_models << "UserRole"
  
end
