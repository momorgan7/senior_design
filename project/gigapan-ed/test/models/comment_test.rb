require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  
  def setup
    @comment = Comment.new(reply:"true",content:"x",x_coord:"1",y_coord:"1",user_id: "1", project_gigapan_id: "1")
  end

  test "should be valid" do
    assert @comment.valid?
  end

  test "content should be present" do
    @comment.content = ""
    assert_not @comment.valid?
  end
  
  test "project gigapan should be present" do
    @comment.project_gigapan_id = ""
    assert_not @comment.valid?
  end
  
  test "user should be present" do
    @comment.user_id = ""
    assert_not @comment.valid?
  end
  
  # need to work on this one a bit more
  # test "reply should target user" do
  #   @comment.reply = true
  #   @comment.reply_to = ""
  #   assert_not @comment.valid?
  # end
  
end