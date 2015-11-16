Rails.application.routes.draw do

   devise_for :users , :path => 'auth',
     controllers: {:registrations => "registrations"}
  resources :users
  resources :comments
  resources :projects
  resources :gigapans
  resources :organizations
  resources :project_gigapans
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
  
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
