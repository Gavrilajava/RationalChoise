class UsersController < ApplicationController

  skip_before_action :logged_in?, only: [:create]


  def create
    user = User.new(user_params)
    if user.valid?
      user.save
      render json: {user: user.name, token: encode_token({user_id: user.id})}, status: :created
    else
      render json: {error: "Failed to create a user"}, status: :not_acceptable
    end
  end


  private

  def user_params
    params.permit(:name, :password)
  end
end
