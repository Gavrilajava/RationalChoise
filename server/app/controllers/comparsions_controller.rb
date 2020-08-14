class ComparsionsController < ApplicationController

  before_action :get_comparsion, only: [:update, :destroy, :show]

  def index
    render json: @user.comparsion_names, status: :ok
  end

  def create
    comparsion = Comparsion.new(strong_params.merge({user: @user}))
    if comparsion.save
      render json: comparsion, status: :created
    else
      render comparsion.errors, status: :not_acceptable
    end
  end

  def destroy
    if @comparsion
      @comparsion.destroy
      render json: {deleted: true}, status: :ok
    else
      render json: {error: "can't find comparsion with id " + params[:id]}, status: :not_acceptable
    end
  end

  def update
    if @comparsion
      @comparsion.update(strong_params)
      render json: comparsion, status: :ok
    else
      render json: {error: "can't find comparsion with id " + params[:id]}, status: :not_acceptable
    end
  end

  def show
    if @comparsion
      if @comparsion.user == @user
        render json: Comparsion.to_frontend(@comparsion.id), status: :ok
      else
        render json: {error: "you are not autorized to compare this"}, status: :not_acceptable
      end
    else
      render json: {error: "can't find comparsion with id " + params[:id]}, status: :not_acceptable
    end
  end


  private

  def get_comparsion
    @comparsion = Comparsion.find_by(id: params[:id], user: @user)
  end

  def strong_params
    params.require(:comparsion).permit(:name)
  end
end
