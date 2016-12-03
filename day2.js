var fs = require("fs");
var input = fs.readFileSync("day2.data", { encoding: 'utf8' });
var directions = input.split("\n");
var code = [];
for (let i=0; i < directions.length; ++i) {
	let line = directions[i];
	let steps = line.split("");
	let number = 5;

	for (let j=0; j < steps.length; ++j) {
		let dir = steps[j];
		let numberWas = number;
		switch(dir) {
			case "R":
				if (number%3 != 0) {
					number++;
				}
				break;
			case "L":
				if ((number-1)%3 != 0) {
					number--;
				}
				break;
			case "U":
				if (number > 3) {
					number-=3;
				}
				break;
			case "D":
				if (number < 7) {
					number+=3;
				}
				break;
		}
	}
	code.push(number);
}

console.log(code.join(""));
