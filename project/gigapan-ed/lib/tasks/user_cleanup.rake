namespace :db do
  task :clean_old_users => :environment do
    puts "cleaning old users from the database"
    @default = User.includes(:comments).find_by(username: "default")
    if(@default == nil)
      puts "Default user not found, script cannot be executed."
    else
      @count = 0
      @users = User.includes(:comments).where(["last_sign_in_at < ?", 1.year.ago])
      @users.find_each do |user|
        @default.comments << user.comments
        user.destroy
        print "."
        @count +=1
      end
      puts "\n" + @count.to_s + " users cleaned"
    end
  end
end