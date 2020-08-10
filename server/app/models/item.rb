class Item < ApplicationRecord
  belongs_to :comparsion
  has_many :values
  has_many :criteria, through: :values
end
