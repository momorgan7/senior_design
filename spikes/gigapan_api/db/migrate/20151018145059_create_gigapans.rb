class CreateGigapans < ActiveRecord::Migration
  def change
    create_table :gigapans do |t|
      t.string :name
      t.string :project
      t.integer :gig_id
      t.string :description

      t.timestamps null: false
    end
  end
end
