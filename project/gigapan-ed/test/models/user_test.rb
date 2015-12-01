require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(username:"batman", first_name: "bat", last_name: "man", password:"password",password_confirmation:"password",email:"batman@gothamcity.net", organization_id: "1", roles: [Role.first])
  end

  test "should be valid" do
    assert @user.valid?
  end
  
  test "username should be present" do
    @user.username = ""
    assert_not @user.valid?
  end

  test "username should not be too long" do
    @user.username = "a" * 51
    assert_not @user.valid?
  end
  
  test "username should be unique" do
    duplicate_user = @user.dup
    duplicate_user.username = @user.username.upcase
    @user.save
    assert_not duplicate_user.valid?
  end
  
  test "first name should be present" do
    @user.first_name = ""
    assert_not @user.valid?
  end
  
  test "email should be present" do
    @user.email = ""
    assert_not @user.valid?
  end
  
  test "email should accept valid" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.find_each do |valid_address|
      @user.email = valid_address
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end
  
  test "email should reject invalid" do
    invalid_addresses = %w[contact@example,com contact_at_foo.org contact.name@example.]
    invalid_addresses.find_each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end
  
  test "password should be present" do
    @user.password = @user.password_confirmation = " " * 6
    assert_not @user.valid?
  end
  
  test "password should not be too short" do
    @user.password = @user.password_confirmation = "a" * 5
    assert_not @user.valid?
  end
  
  test "organization should be present" do
    @user.organization_id = ""
    assert_not @user.valid?
  end
  
  test "role should be present" do
    @user.roles = []
    assert_not @user.valid?
  end
end
