class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.text :desc
      t.boolean :active
      t.boolean :visible

      t.timestamps null: false
    end
  end
end
