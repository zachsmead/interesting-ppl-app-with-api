document.addEventListener("DOMContentLoaded", function(event) {
	var app = new Vue({
		el: "#app",
		data: {
			people: [
				{
					name: "Zach",
					bio: "Goober",
					bioVisible: false
				},
				{
					name: "Ken",
					bio: "Coder",
					bioVisible: false
				},
				{
					name: "TheStig",
					bio: "Racer",
					bioVisible: false
				}
			],

			newPersonName: '',
			newPersonBio: '',
			// newPersonBioVis: false,
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
				var newPerson = {
					name: this.newPersonName,
					bio: this.newPersonBio,
					// bioVisible: this.newPersonBioVis
					bioVisible: false
				}

				if (newPerson["name"] != '' && newPerson["bio"] != '') {
					this.people.push(newPerson);
					this.newPersonName = '';
					this.newPersonBio = '';
				}
			},

			deletePerson: function(person) {
				var index = this.people.indexOf(person);

				if (index > -1) {
					this.people.splice(index, 1)
				}
			}
		}
	});
});
