class AddIndexToComparsionsUserId < ActiveRecord::Migration[6.0]
  def change
    add_index :comparsions, :user_id
  end
end
