require 'test_helper'

class CountryTest < ActiveSupport::TestCase
  def setup
    @country = Country.new(name:"x",iso_code:"x")
  end

  test "should be valid" do
    assert @country.valid?
  end

  test "name should be present" do
    @country.name = ""
    assert_not @country.valid?
  end
  
  test "iso code should be present" do
    @country.iso_code = ""
    assert_not @country.valid?
  end
 
end
