class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :com_type
      t.text :content
      t.float :x_coord
      t.float :y_coord
      t.user :references
      t.project :references
      t.gigapan :references

      t.timestamps null: false
    end
  end
end
