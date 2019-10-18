require 'sinatra/base'
require 'json'

class Thermostat < Sinatra::Base
  enable :sessions

  get '/' do
    erb :index
  end

  get "/temperature" do
    read_file.to_json
  end

  post "/temperature" do
    save_file(params)
  end

  def save_file(params)
    File.open("public/temp.json","w") do |f|
      f.write(params.to_json)
    end
  end

  def read_file
    file = File.open("public/temp.json","r")
    JSON.load file
  end

  run! if app_file == $0
end
