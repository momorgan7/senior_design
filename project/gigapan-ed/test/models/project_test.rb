require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  def setup
    @project = Project.new(name:"x")
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
  
  #not sure, but I think the org, role, and user all have to be saved for this to be tested correctly
  
  # test "should get unique orgs" do
  #   @project.users = [@user, @user.dup]
  #   @project.save
  #   assert_equal 2, @project.distinct_org()
  # end
  
 
end
