require 'test_helper'

class CommentsControllerTest < ActionController::TestCase
  setup do
    @comment = comments(:one)
    @project_gigapan = project_gigapans(:one)
  end

  # test "should get index" do
  #   get :index
  #   assert_response :success
  #   assert_not_nil assigns(:comments)
  # end

  # test "should get new" do
  #   get :new
  #   assert_response :success
  # end

  # test "should create comment" do
  #   assert_difference('Comment.count') do
  #     post :create, comment: {  content: @comment.content,
  #                               parent: @comment.parent,
  #                               project_gigapan: @comment.project_gigapan,
  #                               user: @comment.user,
  #                               x_coord: @comment.x_coord,
  #                               y_coord: @comment.y_coord,
  #                               width: @comment.width,
  #                               height: @comment.height  }
  #   end

  #   assert_redirected_to comment_path(assigns(:comment))
  # end

  # test "should show comment" do
  #   get :show, id: @comment
  #   assert_response :success
  # end

  # test "should get edit" do
  #   get :edit, id: @comment
  #   assert_response :success
  # end

  # test "should update comment" do
  #   patch :update, id: @comment, comment: {  }
  #   assert_redirected_to comment_path(assigns(:comment))
  # end

  # test "should destroy comment" do
  #   assert_difference('Comment.count', -1) do
  #     delete :destroy, id: @comment
  #   end

  #   assert_redirected_to comments_path
  # end
end
