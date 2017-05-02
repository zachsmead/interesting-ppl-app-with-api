class Person < ApplicationRecord

	validates :name, presence: true
	validates :bio, presence: true

end
