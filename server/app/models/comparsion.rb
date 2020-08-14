class Comparsion < ApplicationRecord

  belongs_to :user
  has_many :items, dependent: :destroy
  has_many :values, through: :items
  has_many :criteria, dependent: :destroy

  def self.to_frontend(id)
    # Static method used to get all connected data with one request
    me = Comparsion.where(id: id).includes(:items, :criteria, :values)[0]
    {
      id: me.id,
      name: me.name,
      items: me.items.includes(:criteria, :values),
      criteria: me.criteria
    }
  end
end
