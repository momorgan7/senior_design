require 'test_helper'

class ProjectGigapanTest < ActiveSupport::TestCase
  def setup
    @project_gigapan = ProjectGigapan.new(name:"xxxxxx", project_id: "1", gigapan_id: "1")
  end

  test "should be valid" do
    assert @project_gigapan.valid?
  end
  
  test "name should be present" do
    @project_gigapan.name = ""
    assert_not @project_gigapan.valid?
  end

  test "name should not be too short" do
    @project_gigapan.name = "a" * 5
    assert_not @project_gigapan.valid?
  end
  
  test "project should be present" do
    @project_gigapan.project_id = ""
    assert_not @project_gigapan.valid?
  end
  
  test "gigapan should be present" do
    @project_gigapan.gigapan_id = ""
    assert_not @project_gigapan.valid?
  end
end
