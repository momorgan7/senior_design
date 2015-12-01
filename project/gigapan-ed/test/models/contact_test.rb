require 'test_helper'

class ContactTest < ActiveSupport::TestCase
  def setup
    @contact = Contact.new(name:"x",email:"test@test.test",message:"1",nickname:"1")
  end

  test "should be valid" do
    assert @contact.valid?
  end

  test "contact email should be present" do
    @contact.email = ""
    assert_not @contact.valid?
  end
  
  test "contact email should accept valid" do
    valid_addresses = %w[contact@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.find_each do |valid_address|
      @contact.email = valid_address
      assert @contact.valid?, "#{valid_address.inspect} should be valid"
    end
  end
  
  test "contact email should reject invalid" do
    invalid_addresses = %w[contact@example,com contact_at_foo.org contact.name@example.
                          foo@bar+baz.com]
    invalid_addresses.find_each do |invalid_address|
      @contact.email = invalid_address
      assert_not @contact.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end
  
  #confused how to do this one since I didn't set up this model and don't know how this works
  
  # test "headers should set values" do
  #   @contact.headers()
  #   assert_equal "GigaPan Education Contact Form", @contact.subject
  #   assert_equal "momorgan7@gmail.com", @contact.to
  #   #not sure what to put for checking that the from is correct
  # end
  
end
