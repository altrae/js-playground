import invertObj from './utils';

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

        return stack[exponent - 1];
    }
}

const bob = {
    firstName: "Bob",
    lastName: "Jones",
    phoneNumber: "(650) 777-7777",
    email: "bob.jones@example.com"
};

const mary = {
    firstName: "Mary",
    lastName: "Johnson",
    phoneNumber: "(650) 888-8888",
    email: "mary.johnson@example.com"
};

// const contacts = [bob, mary];

// const printPerson = function (person) {
//     console.log(person.firstName + " " + person.lastName);
// }

// const list = function () {
// 	const contactsLength = contacts.length;
// 	for (let i = 0; i < contactsLength; i++) {
// 		printPerson(contacts[i]);
// 	}
// }

// const search = function (lastName) {
//     const contactsLength = contacts.length;
//     for (let i = 0; i < contactsLength; i++) {
// 		if (lastName.toLowerCase() === contacts[i].lastName.toLowerCase()) {
// 		    printPerson(contacts[i]);
// 		}
// 	}
// };

// const add = function (firstName, lastName, phoneNumber, email) {
//     const newPerson = {
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
// 	const times = $.isNumeric(arg1) ? arg1 : 3;
// 	const delay = $.isNumeric(arg2) ? arg2 : 3000;
// 	const funcToCall = $.isFunction(arg1) ? arg1 : $.isFunction(arg2) ? arg2 : arg3;

// 	let i = 0;
// 	(function loopit() {
// 		i++;
// 		funcToCall();

// 		if(i < times) setTimeout(loopit, delay);
// 	})();
// }

// $(function() {
// 	//callAnotherFunction(5, 1000, functionToCall);
// 	callAnotherFunction(functionToCall);
// });


// const myArray = [1, 2, 3, 4, 5, 6, 7, 7, 6];
// const myArray2 = [9, 10, 12]

// if($.inArray(4, myArray) != -1)
// if($.inArray(77, myArray) != -1)
// $.unique(myArray);
// $.merge(myArray, myArray2);

// const newArray = $.map(myArray, (value, key) => value * 2);

// const grepArray = $.grep(myArray, value => value%2 == 0);


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

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const neighbors = this.aliveNeighbors(this.prevBoard, x, y);
			}
		}
	},

	aliveNeighbors: (array, x, y) => {
		let sum = 0;
		let prevRow = array[y - 1] || [];
		let nextRow = array[y + 1] || [];
		let currRow = array[y];

		const neighbors = [
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

game.next();

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





(() => {
    const isNetflix = window.location.href.indexOf('netflix.com') > -1;
    const slider = [...document.querySelectorAll('.slider')];
    // const sliderButton = [...document.querySelectorAll('.sliderButton')];
    const sliderButton = [...document.querySelectorAll('.slider-item')];
    const evidence = [...document.querySelectorAll('.evidence')];
    const sharingPrompt = [...document.querySelectorAll('.sharing-prompt')];
    const boxShotDivider = [...document.querySelectorAll('.boxShotDivider')];
    const elSet = new Set();

    elSet.add(sliderButton);
    elSet.add(evidence);
    elSet.add(sharingPrompt);
    elSet.add(boxShotDivider);

    if (!isNetflix && confirm('Please open Netflix and try again. Would you like me to redirect you to netflix.com?')) {
        window.location.href = 'http://netflix.com';
    }

    elSet.forEach(
        elArray => elArray.map(element => element.parentNode.replaceChild(element.firstChild, element))
    );

    slider.map(
        element => { element.parentNode.removeChild(element) }
    );
})();



const userToSkill = {
    'lemiesz': ['reactjs', 'web', 'java'],
    'kimia': ['java', 'dynamodb'],
    'sai': ['html', 'frontend']
};

console.info(invertObj(userToSkill));
