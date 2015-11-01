# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
admin = Role.create(name:"admin")
teacher = Role.create(name:"teacher")
student = Role.create(name:"student")
# password and confirmation have to be 8 characters or longer or this will not create a user
Organization.create(name:"Gigapan Administrators")
User.create(username:"batman",password:"password",password_confirmation:"password",email:"batman@gothamcity.net", organization_id: "1") 
UserRole.create(user_id: User.first.id,role_id: Role.first.id)  
User.create(username:"robin",password:"password",password_confirmation:"password",email:"robin@gothamcity.net", organization_id: "1") 
UserRole.create(user_id: User.second.id,role_id: Role.second.id)  
User.create(username:"bruce",password:"password",password_confirmation:"password",email:"bruce@gothamcity.net", organization_id: "1") 
UserRole.create(user_id: User.third.id,role_id: Role.third.id)  