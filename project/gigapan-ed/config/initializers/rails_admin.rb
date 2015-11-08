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
      except "Country"
    end
    export
    bulk_delete
    show
    edit
    delete do
      except "Role"
      except "Organization"
      except "Country"
    end
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
    
  end
  config.model "User" do
    edit do
      field :username 
      field :first_name
      field :last_name
      field :email
      field :password
      field :password_confirmation
      field :organization
      field :roles
      field :avatar
    end
    show do
      field :username
      field :first_name
      field :last_name
      field :email
      field :cont_area do
        label "Content Area"
      end
      field :sign_in_count
      field :last_sign_in_at
      field :roles
      field :organization
      field :avatar
    end
    list do
      field :username
      field :first_name
      field :last_name
      field :email
      field :cont_area do
        label "Content Area"
      end
      field :sign_in_count
      field :last_sign_in_at
      field :organization
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
  
  config.model "Country" do
    edit do
      field :name
    end
    show do
      field :name
      field :iso_code
    end
    list do
      field :name
      field :iso_code
    end
  end
  
  config.model "Organization" do
    edit do
      field :name 
      field :city
      field :state
      field :country
      field :timezone
    end
    show do
      field :name 
      field :city
      field :state
      field :country
      field :timezone
      field :users
    end
    list do
      field :name 
      field :city
      field :state
      field :country
      field :timezone
      field :users
    end
    
  end

  config.excluded_models << "UserRole"
  
  
  
end
