class CreateProjectGigapans < ActiveRecord::Migration
  def change
    create_table :project_gigapans do |t|
      t.belongs_to :project, index: true
      t.string :name
      t.string :ext_id
      t.string :authcode
      t.float :height
      t.float :width
      t.boolean :private
      t.text :desc
      t.timestamps null: false
    end
  end
end
