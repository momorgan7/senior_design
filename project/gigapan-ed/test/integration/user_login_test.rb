require 'test_helper'

class UserLoginTest < ActionDispatch::IntegrationTest
  
  def setup
    @user = users(:two)
  end
  
  test "login with no info" do
    get login_path
    assert_template 'sessions/new'
    post user_session_path, :user => { :username => " ", :password => " "}
    assert_template 'sessions/new'
  end
  
  test "login with valid info" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
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
