class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :name
      t.string :iso_code

      t.timestamps null: false
    end
    
    change_table(:organizations) do |t|
       t.belongs_to :country, index:true
    end
  
  end
end
