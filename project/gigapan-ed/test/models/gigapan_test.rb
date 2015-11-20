require 'test_helper'

class GigapanTest < ActiveSupport::TestCase
  def setup
    @gigapan = Gigapan.new(name:"x",ext_id:"1",authcode:"1")
  end

  test "should be valid" do
    assert @gigapan.valid?
  end

  test "gigapan ext_id should be present" do
    @gigapan.name = ""
    assert_not @gigapan.valid?
  end
  
  test "content should be present" do
    @gigapan.ext_id = ""
    assert_not @gigapan.valid?
  end
  
  test "project gigapan should be present" do
    @gigapan.authcode = ""
    assert_not @gigapan.valid?
  end
  
end
