class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :parent_id
      t.float :x_coord
      t.float :y_coord
      t.belongs_to :user 
      t.belongs_to :project_gigapan 

      t.timestamps null: false
    end
  end
end
