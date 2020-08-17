class Comparsion < ApplicationRecord

  belongs_to :user
  has_many :items, dependent: :destroy
  has_many :values, through: :items
  has_many :criteria, dependent: :destroy

  def to_frontend
    {
      id: self.id,
      name: self.name,
      items: self.items.order(:id),
      criteria: self.criteria.order(:id),
      values: self.values.order(:id)
    }
  end
end
