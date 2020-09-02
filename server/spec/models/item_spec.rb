require 'rails_helper'

RSpec.describe Item, type: :model do
  before(:each) do
    @user = User.create(name: "Gavrila", password: "qwerty")
    @comparsion = Comparsion.create(name: "Gavrila_comparsion", user_id: @user.id)
  end
  describe 'create and validate' do
    it "is valid with valid attributes" do
      expect(Item.new(name: "Gavrila_item", comparsion: @comparsion)).to be_valid
    end
    it "is not valid without a name" do
      expect(Item.new(name: nil, comparsion: @comparsion)).to_not be_valid
    end
    it "is not valid with non unique name in scope of comparsion" do
      item1 = Item.create(name: "Gavrila_item", comparsion: @comparsion)
      item2 = Item.new(name: "Gavrila_item", comparsion: @comparsion)
      expect(item2).to_not be_valid
    end
    it "is valid with non unique name" do
      comp2 =  Comparsion.create(name: "another_Gavrila_comparsion", user_id: @user.id)
      item1 = Item.create(name: "Gavrila_item", comparsion: @comparsion)
      item2 = Item.new(name: "Gavrila_item", comparsion: comp2)
      expect(item2).to be_valid
    end
  end
  after(:each) do
    @user.destroy
  end
end
