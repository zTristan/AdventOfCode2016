var fs = require("fs");
var input = fs.readFileSync("day3.data", { encoding: 'utf8' });
var triangles = input.split("\n");
var counts = {
	valid: 0,
	invalid: 0,
	total: 0
};

for (let i=0; i < triangles.length; ++i) {
	let match = triangles[i].match(/(\d+)\s+(\d+)\s+(\d+)/);
	let dim = match.splice(1);
	let valid = true;
	for (let t=0; t < 3; ++t) {
		let a = parseInt(dim[t]);
		let b = parseInt(dim[(t+1) % 3]);
		let c = parseInt(dim[(t+2) % 3]);
		if (a >= (b + c)) {
			console.log(a + " > " + (b + c));
			valid = false;
			break;
		}
	}
	if (valid) {
		counts.valid++;
	}
	else {
		counts.invalid++;
	}
	counts.total++;
}

console.log(JSON.stringify(counts,null,2));
