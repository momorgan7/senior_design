require 'test_helper'

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = Organization.new(name:"x",city:"x",state:"x",country_id: "1")
  end

  test "should be valid" do
    assert @organization.valid?
  end
  
  test "name should be present" do
    @organization.name = ""
    assert_not @organization.valid?
  end

  test "city should be present" do
    @organization.city = ""
    assert_not @organization.valid?
  end
  
  test "state should be present" do
    @organization.state = ""
    assert_not @organization.valid?
  end
  
  test "country should be present" do
    @organization.country_id = ""
    assert_not @organization.valid?
  end

end
