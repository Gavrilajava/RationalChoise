class CriteriaController < ApplicationController

  before_action :get_criterium, only: [:update, :destroy]


  def create
    criterium = Criterium.new(strong_params)
    if criterium.save
      render json: criterium, status: :created
    else
      render criterium.errors, status: :not_acceptable
    end
  end

  def destroy
    if @criterium
      @criterium.destroy
      render json: {deleted: true}, status: :ok
    else
      render json: {error: "can't find criterium with id " + params[:id]}, status: :not_acceptable
    end
  end

  def update
    if @criterium
      @criterium.update(name: params[:name])
      render json: @criterium, status: :ok
    else
      render json: {error: "can't find criterium with id " + params[:id]}, status: :not_acceptable
    end
  end

  private

  def get_criterium
    @criterium = Criterium.find(params[:id])
  end

  def strong_params
    params.require(:criterium).permit(:name, :weight, :comparsion_id)
  end
end
