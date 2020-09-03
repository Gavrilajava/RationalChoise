class User < ApplicationRecord

  has_many :comparsions, dependent: :destroy
  has_secure_password

  validates :name, presence: true, uniqueness: true

  def comparsion_names
    self.comparsions.pluck(:name, :id)
  end

  def self.get_random_name
    random_name = ""
    loop do
      random_name = Faker::FunnyName.name
      break if !User.find_by(name: random_name)
    end
    random_name
  end
end
