class AddNameToUser < ActiveRecord::Migration
  def change
    add_column :users, :username, :string, :unique => true
  end
end
