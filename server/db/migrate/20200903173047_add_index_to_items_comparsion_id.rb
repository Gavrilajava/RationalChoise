class AddIndexToItemsComparsionId < ActiveRecord::Migration[6.0]
  def change
    add_index :items, :comparsion_id
  end
end
