class Api::V1::PeopleController < ApplicationController

	def index
		@people = Person.all
	end

	def create
		@person = Person.new(name: params[:name], bio: params[:bio], bioVisible: false)
		if @person.save
			render 'show.json.jbuilder'
		else
			# if the model does not save, instead of rendering the show for this json object
			# we will just render a json object here that contains the errors for the object
			render json: { errors: @person.errors.full_messages }, status: 422
		end
	end

	def destroy
		@person = Person.find_by(id: params[:id])
		@person.destroy
		# render 'show.json.jbuilder'
	end

end
