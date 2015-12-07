require 'test_helper'

class DashboardActionsTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @user2 = users(:two)
    @student = users(:three)
  end
  test "create new student by admin" do
    get login_path
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get new_user_path
    assert_template 'users/new'
    post_via_redirect users_path, 'user[username]' => 'testing', 'user[first_name]'=> 'Oliver', 'user[last_name]' => 'Queen', 
      'user[password]'=> 'password', 'user[password_confirmation]'=> 'password', 'user[organization_id]' => @user.organization_id, 'user[email]'=> @user.email
    assert_template 'header_pages/dash'
    assert_select 'h1', text: 'My Dashboard'
  end
  
  test "create new student by teacher" do
    get login_path
    post_via_redirect user_session_path, 'user[username]' => @user2.username, 'user[password]' =>  'password'
    get new_user_path
    assert_template 'users/new'
    post_via_redirect users_path, 'user[username]' => 'testing', 'user[first_name]'=> 'Oliver', 'user[last_name]' => 'Queen', 
      'user[password]'=> 'password', 'user[password_confirmation]'=> 'password', 'user[organization_id]' => @user2.organization_id, 'user[email]'=> @user2.email
    assert_template 'header_pages/dash'
    assert_select 'h1', text: 'My Dashboard'
  end
  
  test "edit profile by teacher" do
    get login_path
    post_via_redirect user_session_path, 'user[username]' => @user2.username, 'user[password]' =>  'password'
    get edit_user_path(id: @user2.id)
    assert_template 'users/edit'
    patch_via_redirect user_path(id: @user2.id), 'user[first_name]'=> 'Tony', 'user[last_name]' => 'Stark', 
      'user[cont_area]'=> 'Computers', 'user[email]'=> @user2.email
    assert_template 'users/show'
  end
  
  test "edit profile by admin" do
    get login_path
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get edit_user_path(id: @user.id)
    assert_template 'users/edit'
    patch_via_redirect user_path(id: @user.id), 'user[first_name]'=> 'Tony', 'user[last_name]' => 'Stark', 
      'user[cont_area]'=> 'Computers', 'user[email]'=> @user.email
    assert_template 'users/show'
  end
  test "edit profile by student" do
    get login_path
    post_via_redirect user_session_path, 'user[username]' => @student.username, 'user[password]' =>  'password'
    get edit_user_path(id: @student.id)
    assert_template 'users/edit'
    patch_via_redirect user_path(id: @student.id), 'user[first_name]'=> 'Tony', 'user[last_name]' => 'Stark'
    assert_template 'users/show'
  end
end
