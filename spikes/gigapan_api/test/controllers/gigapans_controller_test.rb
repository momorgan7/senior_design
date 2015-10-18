require 'test_helper'

class GigapansControllerTest < ActionController::TestCase
  setup do
    @gigapan = gigapans(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gigapans)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create gigapan" do
    assert_difference('Gigapan.count') do
      post :create, gigapan: { description: @gigapan.description, gig_id: @gigapan.gig_id, name: @gigapan.name, project: @gigapan.project }
    end

    assert_redirected_to gigapan_path(assigns(:gigapan))
  end

  test "should show gigapan" do
    get :show, id: @gigapan
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @gigapan
    assert_response :success
  end

  test "should update gigapan" do
    patch :update, id: @gigapan, gigapan: { description: @gigapan.description, gig_id: @gigapan.gig_id, name: @gigapan.name, project: @gigapan.project }
    assert_redirected_to gigapan_path(assigns(:gigapan))
  end

  test "should destroy gigapan" do
    assert_difference('Gigapan.count', -1) do
      delete :destroy, id: @gigapan
    end

    assert_redirected_to gigapans_path
  end
end
