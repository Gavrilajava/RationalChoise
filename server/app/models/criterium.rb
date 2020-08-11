class Criterium < ApplicationRecord
  belongs_to :comparsion
  has_many :values, dependent: :destroy
  has_many :items, through: :values
end
