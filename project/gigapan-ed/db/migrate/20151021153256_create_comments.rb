class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.boolean :reply
      t.text :content
      t.float :reply_to
      t.float :x_coord
      t.float :y_coord
      t.belongs_to :user 
      t.belongs_to :project_gigapan 

      t.timestamps null: false
    end
  end
end
