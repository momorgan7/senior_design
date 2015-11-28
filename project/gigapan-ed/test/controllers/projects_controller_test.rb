require 'test_helper'
include Devise::TestHelpers

class ProjectsControllerTest < ActionController::TestCase
  setup do
    sign_in User.first
    @project = projects(:one)
    @user = users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success, @response.body
    assert_not_nil assigns(:projects)
  end

  test "should get new" do
    get :new
    assert_response :success, @response.body
  end

  test "should create project" do
    assert_difference('Project.count') do
      post :create, project: { name: 'three', desc: ' ', active: 'true', visible: 'true', user: @user }
    end

    assert_redirected_to project_path(assigns(:project))
  end

  test "should show project" do
    get :show, id: @project
    assert_response :success, @response.body
  end

  test "should get edit" do
    get :edit, id: @project
    assert_response :success, @response.body
  end

  # test "should update project" do
  #   patch :update, id: @project, project: { name: 'new'  }
  #   assert_redirected_to project_path(assigns(:project))
  # end

  test "should destroy project" do
    assert_difference('Project.count', -1) do
      delete :destroy, id: @project
    end

    assert_redirected_to projects_path
  end
end
