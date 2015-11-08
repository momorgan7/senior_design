class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :timezone

      t.timestamps null: false
    end

    change_table(:users) do |t|
       t.belongs_to :organization, index:true
    end
  end
end
