require 'test_helper'
include Devise::TestHelpers

class OrganizationsControllerTest < ActionController::TestCase
  setup do
    sign_in User.first
    @organization = organizations(:one)
    @user = users(:one)
    @country = countries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success, @response.body
    assert_not_nil assigns(:organizations)
  end

  test "should get new" do
    get :new
    assert_response :success, @response.body
  end

  test "should create organization" do
    assert_difference('Organization.count') do
      post :create, organization: { name: 'test', city: 'test', state: 'test', country: @country, timezone: 'test'}
    end

    assert_redirected_to organization_path(assigns(:organization))
  end

  test "should show organization" do
    get :show, id: @organization
    assert_response :success, @response.body
  end

  test "should get edit" do
    get :edit, id: @organization
    assert_response :success, @response.body
  end

  # test "should update organization" do
  #   patch :update, id: @organization, organization: { name: 'new' }
  #   assert_redirected_to organization_path(assigns(:organization))
  # end

  test "should destroy organization" do
    assert_difference('Organization.count', -1) do
      delete :destroy, id: @organization
    end

    assert_redirected_to organizations_path
  end
end
