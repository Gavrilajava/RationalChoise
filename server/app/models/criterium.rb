class Criterium < ApplicationRecord
  belongs_to :comparsion
  has_many :values, dependent: :destroy
  has_many :items, through: :values
  validates :name, presence: true, uniqueness: {scope: :comparsion, message: "You need to name criteria differently to differ them in some way."}
end
