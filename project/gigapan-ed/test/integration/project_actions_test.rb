require 'test_helper'

class ProjectActionsTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:two)
    @project1 = projects(:one)
    @project2 = projects(:two)
  end
  test "get project list" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get projects_path
    assert_template 'projects/index'
    assert_select "a[href=?]", project_path(@project1)
    assert_select "a[href=?]", organization_path(@project1.organizations.first)
    assert_select "a[href=?]", user_path(@project1.organizations.first.users.first)
    assert_select "a[href=?]", project_path(@project2), count: 0
    assert_select 'h3>img.flag'
    assert_select 'h1', text: 'Project List'
  end
  
  test "get project page" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get project_path(@project1)
    assert_template 'projects/show'
    assert_select "a[href=?]", edit_project_path(@project1)
    assert_select "a[href=?]", add_students_path(project: @project1)
    assert_select "a[href=?]", add_teachers_path(project: @project1)
    assert_select "a[href=?]", delete_project_gigapans_path(project: @project1)
    assert_select "a[href=?]", new_project_gigapan_path(:project_id => @project1.id)
    assert_select "a[href=?]", project_gigapan_path, count: @project1.project_gigapans.count
    assert_select "li>a[href=?]", user_path(@project1.organizations.first.users.first)
    assert_select 'li>img.flag', count: @project1.users.count
    assert_select 'h1', text: @project1.name
  end
  
  test "get project edit" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get edit_project_path(@project1)
    assert_template 'projects/edit'
    assert_select 'h1', text: 'Editing Project'
  end
  
  test "get project add teachers" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get add_teachers_path(project: @project1)
    assert_template 'projects/_add_teachers'
    assert_select 'h1', text: 'Adding Teachers'
  end
  
  test "get project add students" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get add_students_path(project: @project1)
    assert_template 'projects/_add_students'
    assert_select 'h1', text: 'Adding Students'
  end
  
  test "get project remove gigapans" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get delete_project_gigapans_path(project: @project1)
    assert_template 'projects/_delete_project_gigapans'
    assert_select 'h1', text: 'Editing Project Gigapan List'
  end
  
end
