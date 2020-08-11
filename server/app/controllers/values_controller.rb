class ValuesController < ApplicationController

  before_action :get_value, only: [:update, :destroy]


  def create
    value = Value.new(strong_params)
    if value.save
      render json: value, status: :created
    else
      render value.errors, status: :not_acceptable
    end
  end

  def destroy
    if @value
      @value.destroy
      render json: {deleted: true}, status: :ok
    else
      render json: {error: "can't find value with id " + params[:id]}, status: :not_acceptable
    end
  end

  def update
    if @value
      @value.update(strong_params)
      render json: value, status: :ok
    else
      render json: {error: "can't find value with id " + params[:id]}, status: :not_acceptable
    end
  end

  private

  def get_value
    @value = Value.find(params[:id])
  end

  def strong_params
    params.require(:value).permit(:item_id, :criterium_id, :value, :type)
  end
end
