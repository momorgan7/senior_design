ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require "minitest/reporters"
Minitest::Reporters.use!

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical
  # order.
  include Devise::TestHelpers
  fixtures :comments, :countries, :organizations, :project_gigapans, :projects, :roles, :users


  # Add more helper methods to be used by all tests here...
end

