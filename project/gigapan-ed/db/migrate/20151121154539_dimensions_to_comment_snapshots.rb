class DimensionsToCommentSnapshots < ActiveRecord::Migration
  def change
    add_column :comments, :width, :int
    add_column :comments, :height, :int
  end
end
