require 'test_helper'

class ProjectGigapanActionsTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:two)
    @user1 = users(:one)
    @project = projects(:one)
    @gigapan = project_gigapans(:one)
  end
  
  test "get gigapan page" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get project_gigapan_path(@gigapan)
    assert_template 'project_gigapans/show'
    assert_select "a[href=?]", edit_project_gigapan_path(@gigapan)
    assert_select "a[href=?]", user_path, count: @gigapan.comments.count
    assert_select "a[href=?]", organization_path, count: @gigapan.comments.count
    assert_select "img.flag", count: @gigapan.comments.count
    assert_select 'h3', text: @gigapan.name
  end
  
  test "edit gigapan" do
    get login_path
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get edit_project_gigapan_path(@gigapan)
   patch_via_redirect project_gigapan_path(@gigapan), 'project_gigapan[name]' => 'new name', 'project_gigapan[desc]' => 'new description'
    assert_template 'project_gigapans/show'
  end
  
  test "create gigapan" do
    get login_path
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get new_project_gigapan_path(:project_id => @project.id)
    post_via_redirect project_gigapans_path, 'project_gigapan[name]' => 'new name', 'project_gigapan[desc]' => 'new description', 'project_gigapan[url]' => 'http://gigapan.com/gigapans/1048', 'project_gigapan[project_id]' => @project.id
    assert_template 'project_gigapans/show'
  end
  
    test "edit gigapan admin" do
    get login_path
    post_via_redirect user_session_path, 'user[username]' => @user1.username, 'user[password]' =>  'password'
    get edit_project_gigapan_path(@gigapan)
   patch_via_redirect project_gigapan_path(@gigapan), 'project_gigapan[name]' => 'new name', 'project_gigapan[desc]' => 'new description'
    assert_template 'project_gigapans/show'
  end
  
  test "create gigapan admin" do
    get login_path
    post_via_redirect user_session_path, 'user[username]' => @user1.username, 'user[password]' =>  'password'
    get new_project_gigapan_path(:project_id => @project.id)
    post_via_redirect project_gigapans_path, 'project_gigapan[name]' => 'new name', 'project_gigapan[desc]' => 'new description', 'project_gigapan[url]' => 'http://gigapan.com/gigapans/645', 'project_gigapan[project_id]' => @project.id
    assert_template 'project_gigapans/show'
  end
  
end
