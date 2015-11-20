require 'test_helper'

class ProjectGigapansControllerTest < ActionController::TestCase
  setup do
    @project_gigapan = project_gigapans(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:project_gigapans)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create project_gigapan" do
    assert_difference('ProjectGigapan.count') do
      post :create, project_gigapan: {  }
    end

    assert_redirected_to project_gigapan_path(assigns(:project_gigapan))
  end

  test "should show project_gigapan" do
    get :show, id: @project_gigapan
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @project_gigapan
    assert_response :success
  end

  test "should update project_gigapan" do
    patch :update, id: @project_gigapan, project_gigapan: {  }
    assert_redirected_to project_gigapan_path(assigns(:project_gigapan))
  end

  test "should destroy project_gigapan" do
    assert_difference('ProjectGigapan.count', -1) do
      delete :destroy, id: @project_gigapan
    end

    assert_redirected_to project_gigapans_path
  end
end
