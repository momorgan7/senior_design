class FeatureGigapan < ActiveRecord::Migration
  def change
    add_column :project_gigapans, :featured, :boolean
  end
end
