class Organization < ActiveRecord::Base
    has_many :users
    accepts_nested_attributes_for :users
<<<<<<< HEAD
    

=======
    validates :city,
    :presence => true
    validates :state,
    :presence => true
    validates :country,
    :presence => true
>>>>>>> 23e5fd4f314ed7bddf3c6fa5c164321f7a852601
end
