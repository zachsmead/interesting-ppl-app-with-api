json.array! @people do |person|
	json.id person.id
	json.name person.name
	json.bio person.bio
	json.bioVisible person.bioVisible
end