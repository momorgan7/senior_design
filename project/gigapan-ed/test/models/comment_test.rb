require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  
  def setup
    @comment = Comment.new(content:"x",parent_id:"1",x_coord:"1",width:"1",height:"1",y_coord:"1",user_id: "1", project_gigapan_id: "1")
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
  
  
  # not sure if this one is working correctly
  test "reply should target another comment" do
    @comment.save
    assert_not_equal @comment.id, @comment.parent_id
  end
  
end