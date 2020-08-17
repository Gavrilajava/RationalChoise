class ValuesController < ApplicationController

  before_action :get_value, only: [:create]


  def create
    if @value
      @value.update(strong_params)
      render json: @value, status: :ok
    else
      value = Value.new(strong_params)
      if value.save
        render json: value, status: :created
      else
        render value.errors, status: :not_acceptable
      end
    end
  end



  private

  def get_value
    @value = Value.find_by(item_id: params[:item_id], criterium_id: params[:criterium_id])
  end

  def strong_params
    params.permit(:item_id, :criterium_id, :value)
  end
end
