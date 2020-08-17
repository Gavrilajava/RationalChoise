class UsersController < ApplicationController

  skip_before_action :logged_in?, only: [:create, :random_name]


  def create
    user = User.new(user_params)
    if user.valid?
      user.save
      render json: {user: user.name, token: encode_token({user_id: user.id})}, status: :created
    else
      render json: {error: "Failed to create a user"}, status: :not_acceptable
    end
  end

  def update
    if params[:password]
      if @user.update(user_params)
        render json: {user: @user.name}, status: :ok
      end
    else  
      @user.update(name: params[:name])
      render json: {user: @user.name}, status: :ok
    end
  end

  def random_name
    render json: {name: User.get_random_name}, status: :ok
  end


  private

  def user_params
    params.permit(:name, :password)
  end
end
