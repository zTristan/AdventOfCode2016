var fs = require("fs");
var input = fs.readFileSync("day2.data", { encoding: 'utf8' });
var directions = input.split("\n");
var code = [];
var map = [[0, 0, 1, 0, 0],
		   [0, 2, 3, 4, 0],
		   [5, 6, 7, 8, 9],
		   [0, 'A', 'B', 'C', 0],
		   [0, 0, 'D', 0, 0]];
var pos = [0, 2];

function getValue(x, y) {
	if (x < 0 || x > 4 || y < 0 || y > 4) {
		return 0;
	}
	return map[y][x];
}

for (let i=0; i < directions.length; ++i) {
	let line = directions[i];
	let steps = line.split("");

	for (let j=0; j < steps.length; ++j) {
		let dir = steps[j];

		switch(dir) {
			case "R":
				if (getValue(pos[0]+1, pos[1]) != 0) {
					pos[0]++;
				}
				break;
			case "L":
				if (getValue(pos[0]-1, pos[1]) != 0) {
					pos[0]--;
				}
				break;
			case "U":
				if (getValue(pos[0], pos[1]-1) != 0) {
					pos[1]--;
				}
				break;
			case "D":
				if (getValue(pos[0], pos[1]+1) != 0) {
					pos[1]++;
				}
				break;
		}
	}
	code.push(getValue(pos[0], pos[1]));
}

console.log(code.join(""));
