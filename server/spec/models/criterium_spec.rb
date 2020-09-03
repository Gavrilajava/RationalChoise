require 'rails_helper'

RSpec.describe Criterium, type: :model do
  before(:each) do
    @user = User.create(name: "Gavrila", password: "qwerty")
    @comparsion = Comparsion.create(name: "Gavrila_comparsion", user: @user)
  end
  describe 'create and validate' do
    it "is valid with valid attributes" do
      expect(Criterium.new(name: "Gavrila_criterium", comparsion: @comparsion)).to be_valid
    end
    it "is not valid without a name" do
      expect(Criterium.new(name: nil, comparsion: @comparsion)).to_not be_valid
    end
    it "is not valid with non unique name in scope of comparsion" do
      criterium1 = Criterium.create(name: "Gavrila_item", comparsion: @comparsion)
      criterium2 = Criterium.new(name: "Gavrila_item", comparsion: @comparsion)
      expect(criterium2).to_not be_valid
    end
    it "is valid with non unique name" do
      comp2 =  Comparsion.create(name: "another_Gavrila_comparsion", user_id: @user.id)
      criterium1 = Criterium.create(name: "Gavrila_item", comparsion: @comparsion)
      criterium2 = Criterium.new(name: "Gavrila_item", comparsion: comp2)
      expect(criterium2).to be_valid
    end
  end
  after(:each) do
    @user.destroy
  end
end
