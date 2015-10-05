class User < ActiveRecord::Base
    has_many :comment
    mount_uploader :picture, PictureUploader
end
