document.addEventListener("DOMContentLoaded", function(event) {
	var app = new Vue({
		el: "#app",
		data: {
			people: [],
			newPersonName: '',
			newPersonBio: '',
			errors: [],
			nameFilter: ""
		},

		// 'mounted' designates what will automatically run every time we load the page.
		// the function() in 'mounted:' below is what populates our index page.

		// below, function(result) is the callback function. result is the name for what is returned by
		// the get request on http://localhost:3000/api/v1/people.json,
		// another example:
		// in this example, .done(function (msg) ) is the callback function

		// $.ajax({
		//   method: "POST",
		//   url: "some.php",
		//   data: { name: "John", location: "Boston" }
		// })
		//   .done(function( msg ) {
		//     alert( "Data Saved: " + msg );
		//   });

		mounted: function() {
			$.get('http://localhost:3000/api/v1/people.json', function(result) {
				this.people = result;
			}.bind(this));
			// 'this' inside the function and 'this' outside the function give us 2 different things.
			// inside the function it just gives us the result of the ajax call. but we want the vue instance
			// so .bind(this) binds the 'this' inside the function so that it will return the vue instance.
		},

		methods: {

			toggleBio: function(person) {
				// var index = this.people.indexOf(person);

				// var bioVisible = this.people[index]["bioVisible"];

				// if (bioVisible == false) {
				// 	this.people[index]["bioVisible"] = true;
				// } else {
				// 	this.people[index]["bioVisible"] = false;
				// }
				// is the same as...

				person.bioVisible = !person.bioVisible;
			},

			addPerson: function() {
				// this is the old code which does not interact with the backend.
				// var newPerson = {
				// 	name: this.newPersonName,
				// 	bio: this.newPersonBio,
				// 	bioVisible: false
				// }

				// below, we make a params hash to be sent with ajax to our api.
				// params gets posted to "/people" in the /api/v1 namespace (see routes),
				// then we push it to the people hash.

				var params = {
					name: this.newPersonName,
					bio: this.newPersonBio
				}

				$.post('http://localhost:3000/api/v1/people.json', params, function(result) {
					console.log(result);
					this.people.push(result);
					// this.people.push(newPerson); // old code which doesn't interact with database
					this.newPersonName = '';
					this.newPersonBio = '';
					this.errors = [];
			 // vv we need to remember to bind(this), otherwise we won't be able to access the people array
				}.bind(this)).fail( function (result) { 
					this.errors = result.responseJSON.errors;
				}.bind(this));

			},

			deletePerson: function(person) {
				// var params = {
				// 	id: person.id
				// };

				$.ajax({
					url: 'http://localhost:3000/api/v1/people/'+person.id, 
					type: 'delete',
					success: function() {
						console.log("Success");
						var index = this.people.indexOf(person);

						console.log(index);

						if (index > -1) {
							this.people.splice(index, 1);
						}
					}.bind(this)
				});

			},

			isValidPerson: function(person) {
				if (person.name.toLowerCase().includes(this.nameFilter.toLowerCase())) {
					return true;
				}
			}
		}
	});
});
