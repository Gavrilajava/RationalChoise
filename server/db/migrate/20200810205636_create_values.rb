class CreateValues < ActiveRecord::Migration[6.0]
  def change
    create_table :values do |t|
      t.integer :item_id
      t.integer :criterium_id
      t.string :value
      t.string :type

      t.timestamps
    end
  end
end
