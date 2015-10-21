class CreateGigapans < ActiveRecord::Migration
  def change
    create_table :gigapans do |t|
      t.string :name
      t.string :ext_id
      t.string :authcode

      t.timestamps null: false
    end
  end
end
