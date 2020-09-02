require 'rails_helper'

RSpec.describe Comparsion, :type => :model do
  before(:each) do
    @user = User.create(name: "Gavrila", password: "qwerty")
  end
  describe 'create and validate' do

    it "is valid with valid attributes" do
      expect(Comparsion.new(name: "Gavrila_comparsion", user_id: @user.id)).to be_valid
    end
    it "is not valid without a name" do
      expect(Comparsion.new(name: nil, user_id: @user.id)).to_not be_valid
    end
    it "is not valid with non unique name in scope of user" do
      comp1 = Comparsion.create(name: "Gavrila_comparsion", user_id: @user.id)
      comp2 = Comparsion.new(name: "Gavrila_comparsion", user_id: @user.id)
      expect(comp2).to_not be_valid
    end
    it "is valid with non unique name" do
      user2 =  User.create(name: "Not_Gavrila", password: "qwerty")
      comp1 = Comparsion.create(name: "Gavrila_comparsion", user: @user)
      comp2 = Comparsion.new(name: "Gavrila_comparsion", user: user2)
      expect(comp2).to be_valid
    end
  end
  describe '#to_frontend' do
    describe "return the object with keys and values" do
      before(:all) do
        @comparsion = Comparsion.create(name: "Gavrila_comparsion", user: @user)
        @item1 = Item.create(name: "item1", comparsion: @comparsion)
        @item2 = Item.create(name: "item2", comparsion: @comparsion)
        @criterium1 = Criterium.create(name: "criterium1", comparsion: @comparsion)
        @criterium2 = Criterium.create(name: "criterium2", comparsion: @comparsion)
        @value1 = Value.create(item: @item1, criterium: @criterium1, value: 1)
        @value2 = Value.create(item: @item1, criterium: @criterium2, value: 2)
        @value3 = Value.create(item: @item2, criterium: @criterium1, value: 3)
        @value4 = Value.create(item: @item2, criterium: @criterium2, value: 4)
     
      end
      it "has comparsion id" do
        expect(@comparsion.to_frontend[:id]).to eq(@comparsion.id)
      end
      it "has comparsion name" do
        expect(@comparsion.to_frontend[:name]).to eq(@comparsion.name)
      end
      it "has all items" do
        expect(@comparsion.to_frontend[:items].count).to eq(@comparsion.items.count)
      end
      it "has all criteria" do
        expect(@comparsion.to_frontend[:criteria].count).to eq(@comparsion.criteria.count)
      end
      it "has all values" do
        expect(@comparsion.to_frontend[:values].count).to eq(@comparsion.values.count)
      end
    end
  end
  after(:each) do
    @user.destroy
  end
end