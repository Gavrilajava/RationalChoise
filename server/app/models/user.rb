class User < ApplicationRecord

  has_many :comparsions
  has_secure_password
  
  def comparsion_names
    self.comparsions.pluck(:name)
  end
end
