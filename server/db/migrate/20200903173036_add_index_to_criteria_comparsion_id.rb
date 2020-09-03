class AddIndexToCriteriaComparsionId < ActiveRecord::Migration[6.0]
  def change
    add_index :criteria, :comparsion_id
  end
end
