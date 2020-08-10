class CreateCriteria < ActiveRecord::Migration[6.0]
  def change
    create_table :criteria do |t|
      t.string :name
      t.integer :weight
      t.integer :comparsion_id

      t.timestamps
    end
  end
end
