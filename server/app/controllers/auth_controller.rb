class AuthController < ApplicationController

  skip_before_action :logged_in?, only: [:create]


  def create
      user = User.find_by(name: params[:name])
      if user && user.authenticate(params[:password])
          render json: {user: user.name, token: encode_token({user_id: user.id})}
      else
          render json: {error: "invalid username or password"}, status: :not_acceptable
      end
  end
end
