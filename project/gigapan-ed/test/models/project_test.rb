require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  def setup
    @project = Project.new(name:"x",desc:"test",active:"1",visible:"1")
    @user = User.new(username:"batman", first_name: "bat", last_name: "man", password:"password",password_confirmation:"password",email:"batman@gothamcity.net", organization_id: "1", roles: [Role.first])
  end

  test "should be valid" do
    assert @project.valid?
  end
  
  test "name should be present" do
    @project.name = ""
    assert_not @project.valid?
  end

  test "name should not be too long" do
    @project.name = "a" * 51
    assert_not @project.valid?
  end
  
 
end
