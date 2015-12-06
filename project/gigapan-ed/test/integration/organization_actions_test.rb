class OrganizationActionsTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:two)
    @organization = organizations(:one)
  end
  
  test "get organization list" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get organizations_path
    assert_template 'organizations/index'
    assert_select "a[href=?]", organization_path(@organization)
    assert_select 'img.flag', count: Organization.all.count
    assert_select 'h1', text: 'Schools and Teachers'
    assert_select 'h2', text: @organization.country.name
  end
  
  test "get organization page" do
    get login_path
    assert_template 'sessions/new'
    post_via_redirect user_session_path, 'user[username]' => @user.username, 'user[password]' =>  'password'
    get organization_path(@organization)
    assert_template 'organizations/show'
    assert_select "li>a[href=?]", user_path(@organization.users.first) 
    assert_select 'li>img.flag', count: @organization.users.count
    assert_select "a[href=?]", project_path(@organization.projects.first), count: 0
    assert_select "a[href=?]", project_path(@organization.projects.second), text: @organization.projects.second.name
    assert_select 'h2', text: @organization.name
  end
end