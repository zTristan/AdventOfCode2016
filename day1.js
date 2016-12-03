var fs = require("fs");
var input = fs.readFileSync("day1.data", { encoding: 'utf8' });
var directions = input.split(", ");
var position = {x:0, y:0};
var facing = 0;
var locations = [];

for (let i=0; i < directions.length; ++i) {
	let dir = directions[i];
	let turn = dir[0];
	let paces = parseInt(dir.slice(1));

	if (turn == "L") {
		facing--;
		if (facing < 0) {
			facing = 3;
		}
	}
	else if (turn == "R") {
		facing++;
		if (facing >= 4) {
			facing = 0
		}
	}

	while(paces > 0) {
		switch (facing) {
			case 0:
				position.y += 1;
				break;
			case 1:
				position.x += 1;
				break;
			case 2:
				position.y -= 1;
				break;
			case 3:
				position.x -= 1;
				break;
		}
		paces--;
		var str = JSON.stringify(position);
		if (locations.indexOf(str) == -1) {
			locations.push(str);
		}
		else {
			console.log(JSON.stringify(position, null, 1));
			console.log(Math.abs(position.x)+Math.abs(position.y));
			return;
		}
	}


}
