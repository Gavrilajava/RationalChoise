class Item < ApplicationRecord
  belongs_to :comparsion
  has_many :values, dependent: :destroy
  has_many :criteria, through: :values
end
