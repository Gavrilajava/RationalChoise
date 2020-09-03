class AddIndexToValuesItemId < ActiveRecord::Migration[6.0]
  def change
    add_index :values, :item_id
  end
end
