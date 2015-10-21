class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :lang, :string
    add_column :users, :cont_area, :string
  end
end
