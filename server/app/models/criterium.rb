class Criterium < ApplicationRecord
  belongs_to :comparsion
  has_many :values
  has_many :items, through: :values
end
