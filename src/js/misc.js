// var url = window.location.href;
// var pathname = window.location.pathname;
// var a = document.createElement('a');
// a.href = url;
// console.log(url);
// console.log(pathname);

// // any property of window.location works here:
// document.write('The hostname of ' + url + ' is ' + a.hostname);

// Create an empty array called "stack"
const stack = [];
// Here is our recursive function
const power = (base, exponent) => {
    // Base case 
    if (exponent === 0) {
        return 1;
    }
    // Recursive case
    else {
        stack[exponent - 1] = base * power(base, exponent - 1);
        console.log(stack[exponent - 1]);

        return stack[exponent - 1];
    }
}

// var result = power(3,3);
// console.log(result);
// var confirmed = confirm(result);
// console.log(confirmed);

// var bob = {
//     firstName: "Bob",
//     lastName: "Jones",
//     phoneNumber: "(650) 777-7777",
//     email: "bob.jones@example.com"
// };

// var mary = {
//     firstName: "Mary",
//     lastName: "Johnson",
//     phoneNumber: "(650) 888-8888",
//     email: "mary.johnson@example.com"
// };

// var contacts = [bob, mary];

// var printPerson = function (person) {
//     console.log(person.firstName + " " + person.lastName);
// }

// var list = function () {
// 	var contactsLength = contacts.length;
// 	for (var i = 0; i < contactsLength; i++) {
// 		printPerson(contacts[i]);
// 	}
// }

// var search = function (lastName) {
//     var contactsLength = contacts.length;
//     for (var i = 0; i < contactsLength; i++) {
// 		if (lastName.toLowerCase() === contacts[i].lastName.toLowerCase()) {
// 		    printPerson(contacts[i]);
// 		}
// 	}
// };

// var add = function (firstName, lastName, phoneNumber, email) {
//     var newPerson = {
//         firstName: firstName,
//         lastName: lastName,
//         phoneNumber: phoneNumber,
//         email: email
//     };
//     contacts[contacts.length] = newPerson;
// };

// add("Aaron", "Dewberry", "altrae@gmail.com", "(214) 347-9792");
// list();

// function callAnotherFunction(arg1, arg2, arg3) {
// 	var times = $.isNumeric(arg1) ? arg1 : 3;
// 	var delay = $.isNumeric(arg2) ? arg2 : 3000;
// 	var funcToCall = $.isFunction(arg1) ? arg1 : $.isFunction(arg2) ? arg2 : arg3;

// 	var i = 0;
// 	(function loopit() {
// 		i++;
// 		funcToCall();
// 		if(i < times) setTimeout(loopit, delay);
// 	})();
// }

// function functionToCall() {
// 	console.log("Function called.");
// }

// $(function() {
// 	//callAnotherFunction(5, 1000, functionToCall);
// 	callAnotherFunction(functionToCall);
// });


// var myArray = [1, 2, 3, 4, 5, 6, 7, 7, 6];
// var myArray2 = [9, 10, 12]
// if($.inArray(4, myArray) != -1)
// 	console.log("4 is in the array");
// if($.inArray(77, myArray) != -1)
// 	console.log("77 is in the array");
// $.unique(myArray);
// console.log(myArray);
// $.merge(myArray, myArray2);
// console.log(myArray);

// var newArray = $.map(myArray, function(value, key) {
// 	return value * 2;
// });
// console.log(newArray);

// var grepArray = $.grep(myArray, function(value) {
// 	return value%2 == 0;
// });
// console.log(grepArray);

// console.log($.makeArray($("div")));

// $(function () {

// });


// Conway's Game of Life
/*(function() {
const _ = self.Life = function(seed) {
	this.seed = seed;
	this.height = seed.length;
	this.width = seed[0].length;
	this.prevBoard = [];
	this.board = cloneArray(seed);
};

_.prototype = {
	next: function() {
		this.prevBoard = cloneArray(this.board);

		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				var neighbors = this.aliveNeighbors(this.prevBoard, x, y);
			}
		}
	},

	aliveNeighbors: (array, x, y) => {
		let sum = 0;
		let prevRow = array[y - 1] || [];
		let nextRow = array[y + 1] || [];
		let currRow = array[y];

		let neighbors = [
			prevRow[x - 1],
			prevRow[x],
			prevRow[x + 1],
			currRow[x - 1],
			currRow[x + 1],
			nextRow[x - 1],
			nextRow[x],
			nextRow[x + 1]
		].forEach(a => {
			sum += +!!a;
		});

		return sum;
	},

	toString: function() {
		return this.board.map(
			function(row) {
				return row.join(' ');
			}
		).join('\n');
	}
};

// Helpers
// Warning: clones 2d arrays only
const cloneArray = array => array.slice().map(row => row.slice());
})();

const game = new Life([
	[0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0]
]);

console.log(game + '');

game.next();

console.log(game + '');*/

// You are given a mapping of usernames to the skills each user is proficient at
const userToSkill = {
    'lemiesz': ['reactjs', 'web', 'java'],
    'kimia': ['java', 'dynamodb'],
    'sai': ['html', 'frontend']
}

// Note: this is an example, a real mapping might have 1000s (or even millions) of records in it.
// write a function that will take this mapping and invert it. So for the above example the result would be
// {
//      'reactjs': ['rob'],
//      'web': ['rob'],
//      'java': ['rob', 'kimia'],
//      'html': ['sai'],
//      'frontend': ['sai'],
//      'dynamodb': ['sai']
//  }

console.info(invertObj(userToSkill));