class Api::V1::PeopleController < ApplicationController

	def index
		@people = Person.all
	end

end
