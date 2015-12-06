Rails.application.routes.draw do

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
   devise_for :users , :path => 'auth',
     controllers: {:registrations => "registrations"}
  resources :users, except: [:index]
  resources :projects
  resources :organizations
  resources :project_gigapans,  only: [:new, :create, :show, :destroy, :edit, :update] do
     resources :comments, only: [:new, :create]
   end
  # as :user do
  #   get "/register", to: "registrations#new", as: "register"
  # end
  devise_scope :user do
    get 'sign-in' => "devise/sessions#new", :as => :login
    get 'log-out' => "devise/sessions#destroy", :as => :logout
    authenticated :user do
      root :to => 'header_pages#home', as: :authenticated_root
    end
    unauthenticated :user do
      root :to => 'header_pages#home', as: :unauthenticated_root
    end
  end

  root 'header_pages#home'

  get 'about' => 'header_pages#about'
  match '/dashboard', to: 'header_pages#dash', via: 'get'
  get 'help' => 'header_pages#help'
  match '/contact',     to: 'contacts#new',             via: 'get'
 resources "contacts", only: [:new, :create]
 
  match '/add_students', to: 'projects#add_students', via:  'get'
  match '/add_teachers', to: 'projects#add_teachers', via:  'get'
  match '/delete_project_gigapans', to: 'projects#delete_project_gigapans', via:  'get'
  
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  
  get '*path' => redirect('/dashboard')
end
