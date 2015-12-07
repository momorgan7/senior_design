require 'test_helper'

class UserLoginTest < ActionDispatch::IntegrationTest
  
  def setup
    @user = users(:two)
    @user2 = users(:one)
    @student = users(:three)
  end
  
  test "login with no info" do
    get login_path
    assert_template 'sessions/new'
    post user_session_path, :user => { :username => " ", :password => " "}
    assert_template 'sessions/new'
  end
  
  test "login with valid info" do
    get login_path
    assert_select "a[href=?]", root_path
    assert_select "a[href=?]", contact_path
    assert_select "a[href=?]", help_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    assert_equal '/dashboard', path
    assert_equal 'Signed in successfully.', flash[:notice]
    assert_select "a[href=?]", login_path, count: 0
    assert_select "a[href=?]", logout_path
    assert_select "a[href=?]", user_path(@user)
    assert_select "a[href=?]", organization_path(@user.organization)
    assert_select "a[href=?]", edit_user_path(@user)
    assert_select "a[href=?]", new_user_path
    assert_select "a[href=?]", new_project_path
    assert_select "a[href=?]", projects_path
    assert_select "a[href=?]", organizations_path
    assert_select "a[href=?]", dashboard_path
    assert_select "a[href=?]", root_path
    assert_select "a[href=?]", contact_path
    assert_select "a[href=?]", help_path
    assert_select 'h1', text: 'My Dashboard'
  end
  test "login with valid info as admin" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user2.username, 'user[password]' =>  'password'
    assert_equal '/dashboard', path
    assert_equal 'Signed in successfully.', flash[:notice]
  end
  test "login with valid info as student" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @student.username, 'user[password]' =>  'password'
    assert_equal '/dashboard', path
    assert_equal 'Signed in successfully.', flash[:notice]
  end
  
  test "login with valid username, invalid password" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'badpassword'
    assert_template 'sessions/new'
  end
  
  test "login with invalid username, valid password" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => 'example', 'user[password]' =>  'password'
    assert_template 'sessions/new'
  end
  
  test "redirect if not signed in" do
    get projects_path
    assert_equal 302, status
    follow_redirect!
    assert_equal 200, status
    assert_equal '/', path
  end
  
  test "redirect if user not admin" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get rails_admin_path
    assert_equal 302, status
    follow_redirect!
    assert_equal 200, status
    assert_equal '/', path
    

  end
end
