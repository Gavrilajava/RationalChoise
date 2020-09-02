class Item < ApplicationRecord
  belongs_to :comparsion
  has_many :values, dependent: :destroy
  has_many :criteria, through: :values

  validates :name, presence: true, uniqueness: { scope: :comparsion, message: "You need to name items differently to differ them in some way." }

end
