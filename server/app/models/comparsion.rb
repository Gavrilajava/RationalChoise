class Comparsion < ApplicationRecord

  belongs_to :user
  has_many :items, dependent: :destroy
  has_many :values, through: :items
  has_many :criteria, dependent: :destroy

  def to_frontend
    self
  end
end
