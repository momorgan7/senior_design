class CreateProjectGigapans < ActiveRecord::Migration
  def change
    create_table :project_gigapans do |t|
      t.belongs_to :project, index: true
      t.belongs_to :gigapan, index: true
      t.string :name
      t.text :desc

      t.timestamps null: false
    end
  end
end
