require 'test_helper'

class UsersEditTest < ActionDispatch::IntegrationTest
    def setup
       @user = User.create(username:"testuser",password:"password",password_confirmation:"password",email:"test@test.com")
    end

end
