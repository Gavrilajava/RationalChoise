class AddIndexToValuesCriteriumId < ActiveRecord::Migration[6.0]
  def change
    add_index :values, :criterium_id
  end
end
