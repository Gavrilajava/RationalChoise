class ApplicationController < ActionController::API

  before_action :logged_in?


  def encode_token(payload)
    JWT.encode(payload, ENV["VERY_SECRET_PHRASE"], "HS256")
  end

  def logged_in?
    headers = request.headers["Authorization"]
    token = headers.split(" ")[1]
    begin
      user_id = JWT.decode(token, ENV["VERY_SECRET_PHRASE"])[0]["user_id"]
      @user = User.find(user_id)
    rescue
      @user = nil
    end
    if @user
      return @user
    else
      render json: {error: "You have to be logged in to get this"}, status: :unauthorized
    end
  end
end
