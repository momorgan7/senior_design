require 'test_helper'

class ProjectGigapanTest < ActiveSupport::TestCase
  def setup
    @project_gigapan = ProjectGigapan.new(name:"xxxxxx", ext_id: "1234", authcode: "1", height: "1", width: "1", private: "1", desc: "1", project_id: "1")
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
  
  test "ext_id should be present" do
    @project_gigapan.ext_id = ""
    assert_not @project_gigapan.valid?
  end
  
  test "height should be present" do
    @project_gigapan.height = ""
    assert_not @project_gigapan.valid?
  end
  
  test "width should be present" do
    @project_gigapan.width = ""
    assert_not @project_gigapan.valid?
  end
  
  test "if private, authcode should be present" do
    @project_gigapan.authcode = ""
    assert_not @project_gigapan.valid?
  end
  
  test "if not private, authcode doesn't need to be present" do
    @project_gigapan.private = false
    @project_gigapan.authcode = ""
    assert @project_gigapan.valid?
  end
end
