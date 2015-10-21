class CreateProjectGigapans < ActiveRecord::Migration
  def change
    create_table :project_gigapans do |t|
      t.project :references
      t.gigapan :references
      t.string :name
      t.text :desc

      t.timestamps null: false
    end
    add_foreign_key :project_gigapans, :gigapans
    add_foreign_key :project_gigapans, :projects
  end
end
