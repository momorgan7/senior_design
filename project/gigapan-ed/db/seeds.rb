# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
admin = Role.create(name:"admin")
# password and confirmation have to be 8 characters or longer or this will not create a user
User.create(username:"batman",password:"password",password_confirmation:"password",email:"batman@gothamcity.net") 
UserRole.create(user_id: User.first.id,role_id: Role.first.id)  