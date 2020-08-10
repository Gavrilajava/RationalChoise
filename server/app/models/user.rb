class User < ApplicationRecord

  has_many :comparsions
  has_secure_password
  
end
