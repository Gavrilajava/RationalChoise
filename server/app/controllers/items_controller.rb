class ItemsController < ApplicationController

  before_action :get_item, only: [:update, :destroy]


  def create
    item = Item.new(strong_params)
    if item.save
      render json: item, status: :created
    else
      render item.errors, status: :not_acceptable
    end
  end

  def destroy
    if @item
      @item.destroy
      render json: {deleted: true}, status: :ok
    else
      render json: {error: "can't find item with id " + params[:id]}, status: :not_acceptable
    end
  end

  def update
    if @item
      @item.update(strong_params)
      render json: item, status: :ok
    else
      render json: {error: "can't find item with id " + params[:id]}, status: :not_acceptable
    end
  end

  private

  def get_item
    @item = Item.find(params[:id])
  end

  def strong_params
    params.require(:item).permit(:name)
  end

end
