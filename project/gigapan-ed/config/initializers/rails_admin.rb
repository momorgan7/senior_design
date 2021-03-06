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
      except ["Role", "Country", "ProjectGigapan", "Comment"]
    end
    export
    bulk_delete do
      except ["Role", "Organization", "Country"]
    end
    show do
      except ["Country"]
    end
    edit do
      except ["Country", "Comments"]
    end
    delete do
      except ["Role", "Organization", "Country"]
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
      field :password do
        required false
        end
      field :password_confirmation do
        required false
        end
      field :cont_area do
        label "Content Area"
        end
      field :organization
      field :roles
      field :avatar
      field :locked_at
      field :failed_attempts
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
      field :locked_at
      field :failed_attempts
    end
    list do
      field :username
      field :first_name
      field :last_name
      field :email
      field :cont_area do
        label "Content Area"
      end
      field :last_sign_in_at
      field :sign_in_count
      field :organization
      field :roles
      field :locked_at
      field :failed_attempts
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
  
  config.model "Project" do
   edit do
      field :name 
      field :desc do
        label "Description"
      end
      field :active
      field :visible
      field :users
      field :project_gigapans
      field :comments
    end
    show do
      field :name
      field :desc do
        label "Description"
      end
      field :active
      field :visible
      field :created_at
      field :updated_at
      field :users 
      # field :organizations  
      field :project_gigapans
      field :comments
    end
    list do
       field :name 
      field :active
      field :visible
      field :created_at
      # field :organizations
      field :desc do
        label "Description"
      end
    end
  end
    config.model "ProjectGigapan" do
    edit do
      field :name
      field :desc
      field :featured
    end
    show do
      field :name
      field :desc
      field :project_id
      field :ext_id do
        label "External ID"
      end
      field :authcode
      field :height
      field :width
      field :created_at
      field :featured
    end
    list do
      field :name
      field :project_id
      field :ext_id do
        label "External ID"
      end
      field :private
      field :created_at
    end
  end
     config.model "Comment" do
    show do
      field :content
      field :parent_id
      field :x_coord
      field :y_coord
      field :user
      field :project_gigapan
      field :comments do
        label "Child Comment"
      end
      field :created_at
    end
    list do
      field :user
      field :project_gigapan
      field :content
      field :comments do
        label "Child Comment"
      end
      field :created_at
    end
    edit do
      field :content
      field :user
      field :project_gigapan
    end
  end
  
end
  
  
