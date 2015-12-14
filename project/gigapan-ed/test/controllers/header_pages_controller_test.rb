require 'test_helper'
include Devise::TestHelpers

class HeaderPagesControllerTest < ActionController::TestCase

  test "should get home" do
    get :home
    assert_response :success
  end


  test "should get dash when logged in" do
    sign_in User.first
    get :dash
    assert_response :success
  end

  test "should get help" do
    get :help
    assert_response :success
  end


end
