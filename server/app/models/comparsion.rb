class Comparsion < ApplicationRecord

  belongs_to :user
  has_many :items, dependent: :destroy
  has_many :values, through: :items
  has_many :criteria, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user, message: "You need to name comparisons differently to differ them in some way." }

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
