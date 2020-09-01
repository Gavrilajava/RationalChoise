require 'rails_helper'

RSpec.describe User, :type => :model do
  describe 'create and validate' do
    it "is valid with valid attributes" do
      expect(User.new(name: "Gavrila", password: "qwerty")).to be_valid
    end
    it "is not valid without a name" do
      expect(User.new(name: nil, password: "qwerty")).to_not be_valid
    end
    it "is not valid with non unique name" do
      user1 = User.create(name: "Gavrila", password: "qwerty")
      user2 = User.new(name: "Gavrila", password: "qwerty")
      expect(user2).to_not be_valid
    end
  end
  describe '.get_random_name' do
    it "return random name contains of letters and spaces" do
      expect(User.get_random_name).to match(/^[a-zA-Z\s]*$/)
    end
    it "random names are not yet used" do
      name = User.get_random_name
      expect(User.find_by(name: name)).to eq(nil)
    end
  end
  describe '#comparsion_names' do
    it "return the array of user comparsions" do
      user = User.create(name: "Gavrila", password: "qwerty")
      comp1 = Comparsion.create(user: user, name: "comp1")
      comp2 = Comparsion.create(user: user, name: "comp2")
      expect(user.comparsion_names.find{|c| c[0] == comp1.name}).to_not eq(nil)
      expect(user.comparsion_names.find{|c| c[0] == comp1.name}).to_not eq(comp1.id)
      expect(user.comparsion_names.find{|c| c[0] == comp2.name}).to_not eq(nil)
      expect(user.comparsion_names.find{|c| c[0] == comp2.name}).to_not eq(comp2.id)
    end
  end
end