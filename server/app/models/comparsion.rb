class Comparsion < ApplicationRecord

  belongs_to :user
  has_many :items
  has_many :values, through: :items
  has_many :criteria
end
