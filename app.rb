require 'sinatra/base'
require 'json'

class Thermostat < Sinatra::Base
  enable :sessions

  get '/' do
    # File.read('views/index.html')
    erb :index
  end

  get "/temperature" do
    headers 'Access-Control-Allow-Origin' => '*'
    session[:temperature] = 20 if session[:temperature] == nil
    session[:temperature].to_i.to_json
  end

  post "/temperature" do
    headers 'Access-Control-Allow-Origin' => '*'
    session[:temperature] = params[:temperature]
  end

  run! if app_file == $0
end
