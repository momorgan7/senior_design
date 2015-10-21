class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :country
      t.string :timezone

      t.timestamps null: false
    end
  end
end
