require 'test_helper'

class UserLoginTest < ActionDispatch::IntegrationTest
  test "login with no info" do
    get login_path
    assert_template 'sessions/new'
    post login_path, session:{username: "", password: ""}
    assert_template 'sessions/new'
    # post_via_redirect login_path, username: users(:one).username, password: users(:one).password
    # assert_equal '/dashboard', path
    # assert_equal 'Signed in successfully.', flash[:notice]
  end
end
