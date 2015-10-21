class CreateProjectUsers < ActiveRecord::Migration
  def change
    create_table :project_users do |t|
      t.project :references
      t.user :references

      t.timestamps null: false
    end
    add_foreign_key :project_users, :users
    add_foreign_key :project_users, :projects
  end
end
