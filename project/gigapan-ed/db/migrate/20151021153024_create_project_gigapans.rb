class CreateProjectGigapans < ActiveRecord::Migration
  def change
    create_table :project_gigapans do |t|
      t.belongs_to :project, index: true
      t.string :name
      t.text :desc

      t.timestamps null: false
    end
    
    change_table(:gigapans) do |t|
       t.belongs_to :project_gigapan, index:true
    end
  end
end
