require 'test_helper'

class ProjectGigapanActionsTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:two)
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
  
end
