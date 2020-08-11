namespace :setup do
  desc "Tasks to setup environment"
  task :create_env  do
    desc "Setting up secret phrase for authentication"
    if File.file?('.env')
      File.delete('.env')
    end
    file = File.new('.env', 'w')
    file.puts "VERY_SECRET_PHRASE=#{SecureRandom.alphanumeric(24)}"
    file.close
  end


end